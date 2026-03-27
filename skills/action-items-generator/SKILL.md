---
name: action-items-generator
description: Generate preventive, system-focused RCA remediation tasks with ownership and measurable outcomes. Use after root cause and solution are validated or when the user asks for RCA action items.
---

# Action Items Generator

## Goal
Create actionable remediation items that prevent recurrence.

## Requirements Per Action Item
- Description of system/process improvement
- Owner
- Expected measurable outcome
- Target date (if provided)

## Quality Criteria
- Focus on prevention, not blame.
- Prefer changes to monitoring, automation, process, guardrails, and testing.
- Each item must be testable or measurable.

## Output Template
```markdown
## Action items
1. **Description**: [what to change]
   **Owner**: [team/person]
   **Expected outcome**: [metric/observable result]
   **Target date**: [date or TBD]

2. **Description**: [what to change]
   **Owner**: [team/person]
   **Expected outcome**: [metric/observable result]
   **Target date**: [date or TBD]
```
