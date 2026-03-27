const incidents = {
  "INC-101": {
    summary: "Login failures observed for multiple users",
    impact: "Users unable to access the application for ~30 minutes",
    timeline: [
      "10:05 AM - Spike in authentication errors detected",
      "10:12 AM - Incident declared",
      "10:25 AM - Root cause identified (auth token expiry)",
      "10:35 AM - Fix deployed",
      "10:45 AM - Incident resolved",
    ],
    rootCause:
      "Access tokens expired at a fixed wall-clock boundary while refresh-token rotation lagged under load; clients received 401s in bulk before refresh completed.",
    solution:
      "Extended access-token TTL slightly, staggered token refresh on the client, and deployed a hotfix so refresh endpoints had dedicated capacity and circuit breakers did not drop valid refresh attempts.",
    actionItems: [
      "Add SLO and paging on auth error rate vs baseline (Owner: Platform, Due: 2 weeks)",
      "Load-test token refresh under peak concurrency in staging (Owner: QA, Due: 1 sprint)",
      "Document client token lifecycle and backoff behavior in runbooks (Owner: Eng, Due: 10 days)",
    ],
    mitigationPlan:
      "Canary auth changes; synthetic login checks every minute; temporary capacity buffer on auth tier during release windows.",
  },
  "INC-103": {
    summary: "Delayed notifications in messaging service",
    impact: "Messages delivered with 5–10 minute delay",
    timeline: [
      "2:10 PM - Customer reports delay",
      "2:18 PM - Queue backlog identified",
      "2:30 PM - Queue workers scaled",
      "2:40 PM - Backlog cleared",
    ],
    rootCause:
      "Consumer throughput fell below publish rate after a deploy reduced worker concurrency; autoscaling lag allowed the queue to grow.",
    solution:
      "Reverted concurrency regression, scaled workers horizontally, and raised min replicas for the notification consumer group until traffic stabilized.",
    actionItems: [
      "Alert on queue depth and age-of-oldest-message with tight thresholds (Owner: SRE, Due: 1 week)",
      "Block deploy if consumer lag integration tests fail (Owner: CI, Due: 2 weeks)",
      "Run queue drain drill quarterly (Owner: Messaging, Due: next quarter)",
    ],
    mitigationPlan:
      "Higher min replicas for workers; faster scale-out policy; feature flag to shed non-critical notification types under pressure.",
  },
  "INC-103": {
    summary: "High latency in dashboard loading",
    impact: "Dashboard load time increased to 8–10 seconds",
    timeline: [
      "9:00 AM - Performance alerts triggered",
      "9:05 AM - DB query regression detected",
      "9:20 AM - Query optimized",
      "9:30 AM - Latency normalized",
    ],
    rootCause:
      "A new dashboard aggregate query missed an index and performed a full table scan on a large time-series table.",
    solution:
      "Added a composite index matching the filter and sort columns, rewrote the query to use bounded date ranges, and deployed during low traffic with verified explain plans.",
    actionItems: [
      "Require EXPLAIN review for new dashboard queries in PR template (Owner: Data, Due: 1 week)",
      "Add p95 latency budget tests for top dashboard endpoints (Owner: Perf, Due: 2 sprints)",
      "Backfill missing indexes from slow-query log audit (Owner: DBA, Due: 3 weeks)",
    ],
    mitigationPlan:
      "Read replica for analytics paths; query timeout and default date-range caps on dashboard API; cache hot aggregates for 60s.",
  },
  "INC-104": {
    summary: "Email delivery failures",
    impact: "Transactional emails not sent to ~15% users",
    timeline: [
      "6:45 PM - Email bounce rate increased",
      "6:50 PM - Third-party provider outage confirmed",
      "7:20 PM - Provider service restored",
      "7:30 PM - Email retries successful",
    ],
    rootCause:
      "Primary ESP had a regional outage; our sender had no healthy secondary route and retries exhausted before the provider recovered.",
    solution:
      "Failed over to secondary ESP once health checks passed, replayed dead-lettered sends with idempotency keys, and confirmed delivery metrics returned to baseline.",
    actionItems: [
      "Finish dual-provider integration with automatic failover (Owner: Platform, Due: 4 weeks)",
      "Store and honor extended retry windows for transactional mail (Owner: Messaging, Due: 2 weeks)",
      "Contractual review of ESP SLA and status-page integration for incidents (Owner: Legal/Ops, Due: 6 weeks)",
    ],
    mitigationPlan:
      "Maintain warm standby ESP configuration; reduce batch sizes during provider degradation; status page subscription for vendor incidents.",
  },
};
