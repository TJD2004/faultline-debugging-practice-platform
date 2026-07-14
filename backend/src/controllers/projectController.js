const mongoose = require("mongoose");
const Project = require("../models/Project");
const ProjectSubmission = require("../models/ProjectSubmission");
const User = require("../models/User");
const { evaluateCode } = require("../utils/evaluateChallenge");

// GET /api/projects
async function listProjects(req, res) {
  try {
    const projects = await Project.find({}, "slug title lang difficulty xp coins").sort({ _id: 1 });
    res.json({
      projects: projects.map((p) => ({
        id: p._id.toString(),
        slug: p.slug,
        title: p.title,
        lang: p.lang,
        difficulty: p.difficulty,
        xp: p.xp,
        coins: p.coins,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load projects" });
  }
}

// GET /api/projects/:slug — metadata + every file's buggy content (never solutionContent)
async function getProject(req, res) {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Project not found" });

    const files = [...project.files]
      .sort((a, b) => a.position - b.position)
      .map((f) => ({
        file_path: f.filePath,
        buggy_content: f.buggyContent,
        is_entry_point: f.isEntryPoint,
        position: f.position,
      }));

    res.json({
      project: {
        slug: project.slug,
        title: project.title,
        lang: project.lang,
        difficulty: project.difficulty,
        xp: project.xp,
        coins: project.coins,
        bugReport: project.bugReport,
        objective: project.objective,
        hints: project.hints,
      },
      files,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load project" });
  }
}

// POST /api/projects/:slug/run  { files: { "path/a.js": "...", ... } }  (protected)
async function runProject(req, res) {
  try {
    const project = await Project.findOne({ slug: req.params.slug }, "checkRules");
    if (!project) return res.status(404).json({ error: "Project not found" });

    const { files } = req.body;
    if (!files || typeof files !== "object") return res.status(400).json({ error: "files object is required" });

    const result = evaluateCode(files, project.checkRules);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not evaluate submission" });
  }
}

// GET /api/projects/:slug/solution/*  (protected) — reveal one file's solution content
async function getFileSolution(req, res) {
  try {
    const filePath = req.params[0];
    const project = await Project.findOne({ slug: req.params.slug }, "files");
    if (!project) return res.status(404).json({ error: "Project not found" });

    const file = project.files.find((f) => f.filePath === filePath);
    if (!file) return res.status(404).json({ error: "File not found" });

    res.json({ solution: file.solutionContent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load solution" });
  }
}

// POST /api/projects/:slug/submit  { files, attempts, usedSolution }  (protected)
async function submitProject(req, res) {
  try {
    const project = await Project.findOne({ slug: req.params.slug }, "xp coins checkRules");
    if (!project) return res.status(404).json({ error: "Project not found" });

    const { files, attempts = 1, usedSolution = false } = req.body;
    if (!files || typeof files !== "object") return res.status(400).json({ error: "files object is required" });

    const result = evaluateCode(files, project.checkRules);
    if (!result.success) {
      return res.status(400).json({ error: "Submission does not pass yet", errors: result.errors });
    }

    const xpEarned = usedSolution ? Math.round(project.xp * 0.3) : project.xp;
    const coinsEarned = usedSolution ? Math.round(project.coins * 0.3) : project.coins;

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        await ProjectSubmission.create(
          [{ user: req.user.id, project: project._id, status: "Passed", attempts, xpEarned, coinsEarned }],
          { session }
        );
        await User.updateOne({ _id: req.user.id }, { $inc: { xp: xpEarned, coins: coinsEarned } }, { session });
      });
    } finally {
      await session.endSession();
    }

    res.status(201).json({ xpEarned, coinsEarned });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Submission failed" });
  }
}

module.exports = { listProjects, getProject, runProject, submitProject, getFileSolution };
