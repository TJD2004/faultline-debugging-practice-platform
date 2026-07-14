/**
 * startSchedule/endSchedule are relative-date descriptors evaluated at seed
 * time (see scripts/seed.js) rather than fixed timestamps, so contests stay
 * current no matter when the app is seeded.
 */
const CONTESTS = [
  {
    "slug": "weekend-debug-sprint",
    "title": "Weekend Debug Sprint",
    "description": "Four hand-picked bugs across four languages. Fastest accurate fixes win — the leaderboard ranks by total XP earned during the contest window.",
    "startSchedule": {
      "kind": "now"
    },
    "endSchedule": {
      "kind": "nowPlusDays",
      "days": 2
    },
    "challenges": [
      {
        "challengeSlug": "react-infinite-fetch",
        "position": 1
      },
      {
        "challengeSlug": "python-off-by-one",
        "position": 2
      },
      {
        "challengeSlug": "java-hashcode-missing",
        "position": 3
      },
      {
        "challengeSlug": "sql-subquery-multiple-rows",
        "position": 4
      }
    ]
  },
  {
    "slug": "sprint-01-first-strike",
    "title": "Sprint #1: First Strike",
    "description": "Eight bugs, sixty minutes. Fastest correct total wins.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 0,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 0,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c1-js-array-includes-case",
        "position": 1
      },
      {
        "challengeSlug": "c1-py-list-copy-alias",
        "position": 2
      },
      {
        "challengeSlug": "c1-sql-order-by-alias",
        "position": 3
      },
      {
        "challengeSlug": "c1-go-string-concat-loop",
        "position": 4
      },
      {
        "challengeSlug": "c1-java-string-builder-loop",
        "position": 5
      },
      {
        "challengeSlug": "c1-php-array-key-exists",
        "position": 6
      },
      {
        "challengeSlug": "c1-cpp-integer-division",
        "position": 7
      },
      {
        "challengeSlug": "c1-py-generator-exhaustion",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-02-null-and-void",
    "title": "Sprint #2: Null and Void",
    "description": "A contest built entirely around null, undefined, and empty-state bugs.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 7,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 7,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c2-js-optional-chaining",
        "position": 1
      },
      {
        "challengeSlug": "c2-java-optional-get",
        "position": 2
      },
      {
        "challengeSlug": "c2-sql-coalesce-missing",
        "position": 3
      },
      {
        "challengeSlug": "c2-py-none-default-mutation",
        "position": 4
      },
      {
        "challengeSlug": "c2-go-nil-pointer-deref",
        "position": 5
      },
      {
        "challengeSlug": "c2-ts-null-assertion-abuse",
        "position": 6
      },
      {
        "challengeSlug": "c2-java-null-equals-crash",
        "position": 7
      },
      {
        "challengeSlug": "c2-cpp-nullptr-deref",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-03-async-abyss",
    "title": "Sprint #3: Async Abyss",
    "description": "Race conditions, promises, and timing bugs — eight problems about things happening in the wrong order.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 14,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 14,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c3-js-promise-all-order",
        "position": 1
      },
      {
        "challengeSlug": "c3-py-async-forgot-await",
        "position": 2
      },
      {
        "challengeSlug": "c3-sql-transaction-missing",
        "position": 3
      },
      {
        "challengeSlug": "c3-go-goroutine-no-wait",
        "position": 4
      },
      {
        "challengeSlug": "c3-js-race-condition-counter",
        "position": 5
      },
      {
        "challengeSlug": "c3-py-threading-shared-state",
        "position": 6
      },
      {
        "challengeSlug": "c3-go-channel-deadlock-select",
        "position": 7
      },
      {
        "challengeSlug": "c3-js-stale-closure-state",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-04-database-drama",
    "title": "Sprint #4: Database Drama",
    "description": "SQL-heavy contest — schema mistakes, transaction bugs, and query gotchas.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 21,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 21,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c4-sql-implicit-join-null",
        "position": 1
      },
      {
        "challengeSlug": "c4-sql-delete-no-where",
        "position": 2
      },
      {
        "challengeSlug": "c4-sql-count-distinct-missing",
        "position": 3
      },
      {
        "challengeSlug": "c4-sql-foreign-key-order",
        "position": 4
      },
      {
        "challengeSlug": "c4-sql-having-vs-where",
        "position": 5
      },
      {
        "challengeSlug": "c4-sql-index-missing-slow",
        "position": 6
      },
      {
        "challengeSlug": "c4-sql-n-plus-one-conceptual",
        "position": 7
      },
      {
        "challengeSlug": "c4-sql-string-date-compare",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-05-off-by-one-open",
    "title": "Sprint #5: Off-By-One Open",
    "description": "A whole contest of boundary bugs — the most common family of real-world defects.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 28,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 28,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c5-js-slice-end-index",
        "position": 1
      },
      {
        "challengeSlug": "c5-py-range-exclusive-end",
        "position": 2
      },
      {
        "challengeSlug": "c5-java-substring-bounds",
        "position": 3
      },
      {
        "challengeSlug": "c5-c-buffer-off-by-one-null",
        "position": 4
      },
      {
        "challengeSlug": "c5-go-slice-bounds-panic",
        "position": 5
      },
      {
        "challengeSlug": "c5-php-array-slice-count",
        "position": 6
      },
      {
        "challengeSlug": "c5-cpp-fencepost-matrix",
        "position": 7
      },
      {
        "challengeSlug": "c5-py-binary-search-bounds",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-06-web-of-lies",
    "title": "Sprint #6: Web of Lies",
    "description": "Frontend and API bugs — the gap between what the UI shows and what actually happened.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 35,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 35,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c6-js-fetch-no-status-check",
        "position": 1
      },
      {
        "challengeSlug": "c6-js-cors-hardcoded-origin",
        "position": 2
      },
      {
        "challengeSlug": "c6-js-form-default-submit",
        "position": 3
      },
      {
        "challengeSlug": "c6-js-debounce-search-input",
        "position": 4
      },
      {
        "challengeSlug": "c6-js-xss-innerhtml",
        "position": 5
      },
      {
        "challengeSlug": "c6-php-csrf-missing",
        "position": 6
      },
      {
        "challengeSlug": "c6-js-memory-leak-listener",
        "position": 7
      },
      {
        "challengeSlug": "c6-js-jwt-not-verified",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-07-type-trouble",
    "title": "Sprint #7: Type Trouble",
    "description": "Type coercion, casting, and comparison bugs across languages.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 42,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 42,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c7-js-parseint-radix",
        "position": 1
      },
      {
        "challengeSlug": "c7-js-nan-equality",
        "position": 2
      },
      {
        "challengeSlug": "c7-py-type-string-int-concat",
        "position": 3
      },
      {
        "challengeSlug": "c7-ts-any-type-escape",
        "position": 4
      },
      {
        "challengeSlug": "c7-php-loose-in-array",
        "position": 5
      },
      {
        "challengeSlug": "c7-java-autoboxing-npe",
        "position": 6
      },
      {
        "challengeSlug": "c7-cpp-implicit-narrowing",
        "position": 7
      },
      {
        "challengeSlug": "c7-go-interface-nil-check",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-08-security-sweep",
    "title": "Sprint #8: Security Sweep",
    "description": "Eight vulnerabilities pulled straight from real security audits.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 49,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 49,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c8-php-plaintext-password",
        "position": 1
      },
      {
        "challengeSlug": "c8-js-eval-user-input",
        "position": 2
      },
      {
        "challengeSlug": "c8-sql-string-concat-injection",
        "position": 3
      },
      {
        "challengeSlug": "c8-js-open-redirect",
        "position": 4
      },
      {
        "challengeSlug": "c8-node-command-injection",
        "position": 5
      },
      {
        "challengeSlug": "c8-php-file-upload-unrestricted",
        "position": 6
      },
      {
        "challengeSlug": "c8-node-jwt-secret-hardcoded",
        "position": 7
      },
      {
        "challengeSlug": "c8-py-pickle-untrusted",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-09-loop-logic",
    "title": "Sprint #9: Loop Logic",
    "description": "Iteration bugs — infinite loops, wrong conditions, and mutation-while-iterating traps.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 56,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 56,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c9-js-foreach-no-break",
        "position": 1
      },
      {
        "challengeSlug": "c9-py-infinite-while-no-update",
        "position": 2
      },
      {
        "challengeSlug": "c9-java-modify-list-foreach",
        "position": 3
      },
      {
        "challengeSlug": "c9-go-for-range-value-copy",
        "position": 4
      },
      {
        "challengeSlug": "c9-py-list-remove-while-iterating",
        "position": 5
      },
      {
        "challengeSlug": "c9-js-array-length-cache",
        "position": 6
      },
      {
        "challengeSlug": "c9-cpp-iterator-invalidation",
        "position": 7
      },
      {
        "challengeSlug": "c9-go-infinite-loop-condition",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-10-frontend-frenzy",
    "title": "Sprint #10: Frontend Frenzy",
    "description": "React, DOM, and browser-state bugs under time pressure.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 63,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 63,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c10-js-stale-closure-state",
        "position": 1
      },
      {
        "challengeSlug": "c10-js-array-mutate-render",
        "position": 2
      },
      {
        "challengeSlug": "c10-ts-event-target-cast",
        "position": 3
      },
      {
        "challengeSlug": "c10-js-debounce-this-binding",
        "position": 4
      },
      {
        "challengeSlug": "c10-js-memory-leak-listener",
        "position": 5
      },
      {
        "challengeSlug": "c10-ts-generic-constraint-missing",
        "position": 6
      },
      {
        "challengeSlug": "c10-js-recursive-dom-no-base",
        "position": 7
      },
      {
        "challengeSlug": "c10-ts-async-race-in-effect",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-11-config-catastrophe",
    "title": "Sprint #11: Config Catastrophe",
    "description": "Environment, deployment, and configuration bugs.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 70,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 70,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c11-bash-unset-env-default",
        "position": 1
      },
      {
        "challengeSlug": "c11-docker-hardcoded-secret",
        "position": 2
      },
      {
        "challengeSlug": "c11-git-committed-env-file",
        "position": 3
      },
      {
        "challengeSlug": "c11-yaml-indentation-bug",
        "position": 4
      },
      {
        "challengeSlug": "c11-docker-compose-network",
        "position": 5
      },
      {
        "challengeSlug": "c11-php-display-errors-prod",
        "position": 6
      },
      {
        "challengeSlug": "c11-git-merge-wrong-branch",
        "position": 7
      },
      {
        "challengeSlug": "c11-bash-cron-relative-path",
        "position": 8
      }
    ]
  },
  {
    "slug": "sprint-12-grand-finale",
    "title": "Sprint #12: Grand Finale",
    "description": "The hardest mix yet — a little bit of everything from the past 11 sprints.",
    "startSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 77,
      "hour": 19,
      "minute": 0,
      "second": 0
    },
    "endSchedule": {
      "kind": "upcomingSaturdayPlusDaysAtTime",
      "extraDays": 77,
      "hour": 20,
      "minute": 0,
      "second": 0
    },
    "challenges": [
      {
        "challengeSlug": "c12-js-array-sort-mutates",
        "position": 1
      },
      {
        "challengeSlug": "c12-py-except-bare-swallow",
        "position": 2
      },
      {
        "challengeSlug": "c12-sql-null-in-not-in",
        "position": 3
      },
      {
        "challengeSlug": "c12-java-immutable-list-modify",
        "position": 4
      },
      {
        "challengeSlug": "c12-go-defer-loop-resource",
        "position": 5
      },
      {
        "challengeSlug": "c12-cpp-vector-reference-invalidation",
        "position": 6
      },
      {
        "challengeSlug": "c12-py-mutable-class-attribute",
        "position": 7
      },
      {
        "challengeSlug": "c12-js-prototype-pollution",
        "position": 8
      }
    ]
  }
];

module.exports = { CONTESTS };
