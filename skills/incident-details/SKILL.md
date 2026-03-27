---
name: incident-details
description: Collect incident information step by step for RCA drafting. Use when starting or updating an RCA, gathering what/when/impact/evidence details, or filling missing mandatory RCA sections.
---

# Incident Details

## Goal
Gather complete, verifiable incident context before analysis.

## Required RCA Sections
1. Incident summary
2. Impact
3. Timeline
4. Root cause
5. Solution
6. Action items
7. Mitigation plan

## Collection Workflow
1. Ask one focused question at a time.
2. Capture only user-provided facts and evidence.
3. Reflect back the captured details in a compact draft.
4. Identify missing mandatory sections.
5. Ask follow-up questions only for missing or conflicting details.

## Data Quality Rules
- Treat unknown details as unknown; never infer facts.
- Ask for evidence references (logs, alerts, dashboards, tickets) for key claims.
- Separate observations from assumptions.

## Output Format
Use this structure while collecting:

```markdown
## Incident summary
[facts]

## Impact
[facts]

## Timeline
[ordered events with time references]

## Root cause
[current known cause or "pending"]

## Solution
[proposed/implemented fix or "pending"]

## Action items
- [pending or known]

## Mitigation plan
[pending or known]
```
