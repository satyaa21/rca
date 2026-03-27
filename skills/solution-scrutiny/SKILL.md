---
name: solution-scrutiny
description: Scrutinize RCA root cause and solution quality for evidence, assumptions, and system-level reasoning. Use when reviewing RCA drafts or evaluating whether a proposed fix is complete and non-speculative.
---

# Solution Scrutiny

## Goal
Stress-test RCA reasoning without adding new facts.

## Checks
1. Are assumptions explicitly listed?
2. Are conclusions backed by evidence?
3. Is the cause framed at system/process level?
4. Are alternative plausible causes considered and addressed?
5. Is the proposed solution clearly linked to the identified cause?

## Constraints
- Do not invent evidence, events, or causes.
- Flag gaps as questions, not assertions.
- Keep feedback concise and specific.

## Review Output
```markdown
## Scrutiny Result
- Verdict: [pass | revise]

## Strengths
- [evidence-backed points]

## Gaps to Resolve
- [question]
- [question]

## Assumptions Identified
- [assumption]

## Recommended Revisions
- [specific update requested]
```
