# Handoff footer (referenced by every phase prompt)

Hand off ONLY when all four gates pass:
1. This phase's PR is merged green.
2. Every exit criterion in the prompt is checked.
3. Pre-handoff audit done: ONE re-run of `./verify.sh` (and `deploy/make-zip.sh` if the phase
   touched what ships) on main, ONE adversarial re-read of your own merged diff, findings fixed in
   ONE follow-up commit. No second round.
4. `docs/log/<phase>.md` written (≤ 12 lines "Built", ≤ 8 "Decisions", ≤ 8 "Known issues", one
   "Verification:" line) and its index line added to plan.md §9. Committed and pushed.

Then spawn the next phase as a NEW session with the claude-code-remote `create_session` tool:
`source_url` = this repository's URL (so the session starts with the repo attached instead of
"default"), `title` = `<repo> — Phase <id> <name> (<Model>)`, inherit environment and permission
mode (never `plan`), `model` = the next phase's model from the plan.md phase table (Opus or Sonnet
only — NEVER Fable, see plan §4.8). Always pass `model` explicitly as the current model id of that
family (look it up in the `claude-api` skill; `create_session` otherwise inherits the caller's
model, which is wrong at a model switch). `prompt` exactly:
`Read prompts/<next-file>.md in this repo and execute it.`
Then end with a short phase report (PR link, what exists now, deviations).

Who spawns what:
- A lane 1 phase spawns the next lane 1 phase.
- The LAST lane 1 phase creates the watcher Routine (see `prompts/_watcher.md`), then spawns every
  lane 2 phase at once, up to 4 concurrent sessions; the watcher starts the rest as slots free up.
- A lane 2 phase spawns nothing: it ends with its phase report.
- The link pass deletes the watcher Routine, then stops with the closing report.

Fallback if `create_session` is unavailable: same model next → continue in this window; model switch
→ stop and report.
Never hand off with a red build, an open PR, or an unmet exit criterion.
