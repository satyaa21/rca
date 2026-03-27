
# RCA generator

## Skills
### Structure for the report
1. Incedent summary
2. Impact
3. Timeline
4. Root cause
5. Solution
6. Action items
7. Mitigation plan
### Scrutinise the solution

## Rules
### RCA Format
1. Blameless tone
2. Use "we" not "they"
3. Focus on system and process
4. All sections must be fixed as per the report structure
5. 

## Workflow
1. Start with step 1. Ask the question and wait for the response
2. Proceed with subsequent steps.
3. At step 5, when solution is given, use scrutiny skill to ask more questions about the solution
4. Complete remaining steps
5. Offer to write to a file. Eg `docs/RCAs`



# RCA Workflow (Skills & Rules Driven)

This document describes the Root Cause Analysis (RCA) workflow implemented using
**skills** and **rules**, with a human-in-the-loop approval step.

## Workflow Diagram

```mermaid
flowchart TD
    A([Start Workflow])

    B[Skill: Incident Details
Collect incident details step by step
What, When, Impact, Evidence]

    C{Rule Check
All mandatory sections present?}

    D[Request missing information
and update incident details]

    E[Skill: Scrutiny
Scrutinise solution
Validate assumptions
Check evidence
No blame]

    F{Rule Check
Tone is blameless?}

    G[Rewrite content
to ensure blameless tone]

    H[Skill: Generate Action Items
Prevent recurrence
Define owners
Measurable outcomes]

    I[Save draft
docs/RCA/action-items/]

    J[Present for review
Human in the loop]

    K{Approved?}

    L[Save final RCA
docs/RCA/]

    M([End Workflow])

    A --> B --> C
    C -- Yes --> E
    C -- No --> D --> B

    E --> F
    F -- No --> G --> E
    F -- Yes --> H

    H --> I --> J --> K
    K -- Yes --> L --> M
    K -- No --> E
