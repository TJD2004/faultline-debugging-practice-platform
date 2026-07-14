/**
 * dayOffset is relative to the date the seed script is run (0 = today).
 * Re-run the seed script periodically to keep the upcoming week full.
 */
const DAILY_CHALLENGES = [
  {
    "challengeSlug": "js-reduce-no-initial",
    "dayOffset": 0,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "js-default-sort-numeric",
    "dayOffset": 1,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "js-object-reference-equality",
    "dayOffset": 2,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "js-find-returns-undefined",
    "dayOffset": 3,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "ts-unsafe-type-assertion",
    "dayOffset": 4,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "ts-optional-property-unchecked",
    "dayOffset": 5,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "ts-non-exhaustive-switch",
    "dayOffset": 6,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "py-unboundlocal-global",
    "dayOffset": 7,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "py-typo-swallowed-by-bare-except",
    "dayOffset": 8,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "py-float-equality",
    "dayOffset": 9,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "py-shared-list-reference",
    "dayOffset": 10,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "java-integer-cache-equality",
    "dayOffset": 11,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "java-shallow-clone-2d-array",
    "dayOffset": 12,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "java-unintended-static-field",
    "dayOffset": 13,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "c-signed-unsigned-comparison",
    "dayOffset": 14,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "c-switch-fallthrough",
    "dayOffset": 15,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "c-format-specifier-mismatch",
    "dayOffset": 16,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "cpp-iterator-invalidation",
    "dayOffset": 17,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "cpp-integer-division-truncation",
    "dayOffset": 18,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "cpp-member-init-order",
    "dayOffset": 19,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "go-slice-append-aliasing",
    "dayOffset": 20,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "go-struct-pass-by-value",
    "dayOffset": 21,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "go-defer-in-loop",
    "dayOffset": 22,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "sql-like-missing-wildcard",
    "dayOffset": 23,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "sql-count-column-skips-null",
    "dayOffset": 24,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "sql-not-equal-null",
    "dayOffset": 25,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "docker-exec-form-no-var-substitution",
    "dayOffset": 26,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "docker-multistage-copy-typo",
    "dayOffset": 27,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "git-force-push-overwrite",
    "dayOffset": 28,
    "bonusMultiplier": 1.5
  },
  {
    "challengeSlug": "git-unresolved-merge-markers",
    "dayOffset": 29,
    "bonusMultiplier": 1.5
  }
];

module.exports = { DAILY_CHALLENGES };
