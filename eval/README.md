# /eval — assistant evaluation set

Nightly job on the Pi (`pi/workers/nightly_eval`) runs these Q/A pairs against the internal assistant and scores responses using Claude Sonnet as judge. Tracks pass rate over time; alerts on regressions.

## Files

- `qa_pairs.jsonl` — one JSON object per line, each with `question`, `expected_answer_sketch`, `must_cite_source_types`, `tags`
- `judge_prompt.md` — prompt used by the Claude-as-judge to score each response
- `scoreboard.md` — auto-updated history of pass rates (top of file is most recent)

## Adding a Q/A pair

When you fix something the assistant got wrong, add the corrected example here. The thumbs-down feedback flow does this automatically (writes to `qa_pairs.jsonl`); manual adds are fine too.

```jsonl
{"question":"Who is Platt Partners' biggest client?","expected_answer_sketch":"Jack in the Box","must_cite_source_types":["wiki"],"tags":["business-overview"]}
```

## Pass criteria

A response passes if:
1. It contains the expected answer (or a faithful paraphrase)
2. It cites at least one of `must_cite_source_types`
3. It does NOT contain hallucinated facts (judge evaluates this separately)

## Regression alert

If pass rate drops > 10% from the trailing 7-day average, the worker:
1. Posts to Slack `#peter-approvals` channel (or a dedicated `#alerts` channel)
2. Writes a `docs/blockers.md` entry
3. Pauses the index-update job until Ryan reviews

## Eval set growth target

- Phase 3 launch: 30 seed pairs
- Phase 4: 50 pairs (BD coverage)
- Phase 5: 75–100 pairs (across all features)

More than ~100 pairs adds cost without proportional value — prune older / less-informative pairs.
