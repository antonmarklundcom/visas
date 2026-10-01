# Phase <ID> — <name>. <Sonnet|Opus> session. Lane 2, runs in parallel with <other lane 2 ids>.

<!--
  Copy this file to prompts/<lane>-<n>-<slug>.md and fill in every <angle-bracket> slot.
  Keep the finished prompt under ~35 lines: the detail belongs in plan.md, this file points at it.
  Delete this comment.
-->

Read ONLY: this file, `plan.md` §1 (decisions already made), §4 (autonomy protocol),
§<own plan sections>, the phase table and §9's index, and `docs/log/<dep>.md` for each phase in
Depends on: <ids, or "none — lane 1 is merged">. Do not read the rest of the plan, the other phases'
logs, or KNOWN-ISSUES.md. Execute under the autonomy protocol §4. Build nothing outside the plan.

Owns (the only paths you may create or modify, plus the §4.9 append-only exceptions —
`docs/log/<ID>.md`, a new `/* == <ID> == */` block at the END of `assets/css/site.css`, and your own
new content/template/route/JS files):
- `content/<file>.php`
- `<route-dir>/**`
- `assets/js/<dir>/**`
- `docs/log/<ID>.md`

Hard limits (lane 2): no changes to `lib/**`, `partials/**`, `enviar.php`, `router.php`, `.htaccess`,
`verify.sh`, `deploy/**`, the CSS tokens block, or any content file another phase owns. If you need
one, write the workaround plus a Backlog note in `docs/log/<ID>.md` — or, if it truly blocks you,
append the question to `docs/decisions-needed.md`, push the branch and end (§4.4). Never wait in the
session for an answer.

Budget: one session, ≤ 90 minutes. Polish cap §4.13: ONE screenshot pass (≤ 5 pages × 2 widths,
after the last code change), ONE interaction pass and only if this phase ships JS, the verify script
as often as you like while fixing but only the final green run reported, PR body written once
(≤ 25 lines, link the CI screenshot artifact, never embed images). When every exit criterion passes,
open the PR in that same turn — improvements found afterwards go to the Backlog, not to commits.

Phase rules:
- Branch `phase/<ID>` off latest main. WIP commit at least every 30 minutes.
- Load these skills at the matching step: <e.g. `paraguay-business-apps` | `sweden-business-apps`,
  `vendercrm-lead-capture`, `higgsfield-web-imagery`>.
- <3–6 phase-specific bullets: the traps, the quality bar, what NOT to spend effort on.>
- Same-shaped units (N ≥ 4 pages, articles or guides): build the template plus ONE exemplar first,
  then fan the rest out as parallel Sonnet subagents per `fable-directs-sonnet-builds` §Fan-out —
  one verify, one PR. Never spawn a Fable-class subagent (§4.8).
- Re-runnable: check what already exists on the branch and continue from the first unmet exit
  criterion. Minor issues → `docs/log/<ID>.md`; stop only per §4.4.

Exit (all must hold before the PR opens):
- <concrete, checkable criteria — e.g. "the 8 service URLs in content/services.php render full copy,
  each with FAQ JSON-LD that validates, each linking to ≥ 1 guide">
- `./verify.sh` green on the branch, and the route contract covers every new URL.
- PR merged green. Screenshots: CI artifact, not committed.

## After this phase
Follow `prompts/_handoff.md`. Lane 2 spawns nothing — end with your phase report.
