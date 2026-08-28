(function(){
var phases=[
{n:0,t:"Freeze the decision and stop divergence",p:"Prevent either codebase from creating more conflicting structures while the current state is inventoried.",g:"Written freeze accepted",x:[
{o:"sean",t:"Publish the database authority decision",d:"Record that Neon is authoritative for pckup.com/ai and that existing web-app tables remain owned by pckup-web-app.",q:"Versioned data-placement and ownership document."},
{o:"kouhei",t:"Freeze new Render database expansion",d:"Preserve all five Drizzle migrations and current data, but create no new product tables until classification is approved.",q:"MCP decision record naming the current migration head."},
{o:"joint",t:"Approve the non-overlap rules",d:"Confirm that neither repo may create duplicate conversation, usage, budget, ownership, or saved-order tables.",q:"Both owners approve one matrix."}]},
{n:1,t:"Inventory what already exists",p:"Create evidence before designing the target. Nothing is deleted or recreated in this phase.",g:"Complete source inventory",x:[
{o:"kouhei",t:"Export the complete Drizzle package",d:"Provide schema source, five migrations, snapshots, journal, generated SQL, and the deployed commit SHA.",q:"Reviewed inventory in pckup-mcp."},
{o:"kouhei",t:"Profile the live Render database",d:"Capture schema-only DDL, row counts, sizes, indexes, constraints, triggers, timestamps, and production-data status.",q:"Sanitized report with no credentials or customer content."},
{o:"sean",t:"Inventory the existing Neon AI domain",d:"Document deployed tables, indexes, constraints, retention, outage behavior, and migration authority for AI data.",q:"Inventory tied to the production web-app SHA."},
{o:"joint",t:"Classify every Render table",d:"Assign exactly one disposition: duplicate, MCP runtime, Temporal, observability, unused, or unique business data.",q:"No unclassified table remains."}]},
{n:2,t:"Define the ownership contract",p:"Turn the architecture into enforceable code, database, and permission boundaries.",g:"Contract signed off",x:[
{o:"sean",t:"Define the web-app-owned table allowlist",d:"Name the exact existing AI, conversation, share, star, ownership, and usage tables controlled by the web app.",q:"Human-readable contract plus machine-readable guard."},
{o:"kouhei",t:"Propose the minimal MCP runtime schema",d:"Keep only justified idempotency, workflow-link, safe execution, and security-audit metadata. Exclude product duplicates.",q:"Every proposed table has a purpose and retention rule."},
{o:"sean",t:"Define the web-to-MCP contract",d:"Specify verified identity, conversation context, request IDs, confirmation data, and returned usage or execution results.",q:"Versioned request and response examples."},
{o:"kouhei",t:"Map MCP outputs to the contract",d:"Define execution results, upstream-call counts, safe errors, workflow references, and idempotency without owning chat history.",q:"MCP contract tests."}]},
{n:3,t:"Prepare Neon and refactor Drizzle in parallel",p:"Each owner works only inside their boundary. Production data does not move yet.",g:"Isolated schemas pass tests",x:[
{o:"sean",t:"Create a Neon rehearsal branch",d:"Branch from production, prove the web-app bootstrap, and preserve a clean rollback point.",q:"Branch ID, baseline SHA, and successful checks."},
{o:"sean",t:"Provision separate Neon roles",d:"Create web runtime, MCP runtime, migration, and read-only roles with least-privilege grants.",q:"Unauthorized cross-schema writes fail."},
{o:"kouhei",t:"Fence Drizzle to mcp_runtime",d:"Use a named schema and MCP-specific migration journal. No declaration may target web-owned public tables.",q:"Generated SQL touches only approved MCP objects."},
{o:"kouhei",t:"Reconcile the five existing migrations",d:"Preserve history but produce reviewed forward migrations that create only approved runtime structures.",q:"Sean reviews the DDL before execution."},
{o:"sean",t:"Guard web-owned tables",d:"Add checks that reject unexpected schema drift or migration ownership changes to existing AI tables.",q:"A deliberate unauthorized migration fails CI."},
{o:"kouhei",t:"Remove duplicate product persistence",d:"Return execution results to the web app instead of storing chats, budgets, ownership, shares, or saved orders.",q:"One canonical write path per product record."}]},
{n:4,t:"Rehearse the migration end to end",p:"Prove the target on a disposable Neon branch before production credentials or traffic change.",g:"Rehearsal proven",x:[
{o:"kouhei",t:"Load only MCP-owned Render data",d:"Export, transform, and idempotently load rows classified as MCP-owned into the rehearsal branch.",q:"Counts and hashes reconcile."},
{o:"sean",t:"Verify Neon target integrity",d:"Confirm web tables are unchanged, permissions stay fenced, backups exist, and the web app operates normally.",q:"Negative permission tests and integrity report pass."},
{o:"kouhei",t:"Run the MCP integration suite",d:"Test tools, confirmed writes, token injection, Temporal links, retries, idempotency, and database outages.",q:"Passing report tied to the MCP commit."},
{o:"sean",t:"Run the pckup.com/ai integration suite",d:"Test chats, save and adoption, shares, stars, budget reserve and settle, and explicit order confirmation.",q:"Passing report tied to the web-app commit."},
{o:"joint",t:"Complete a real restore drill",d:"Restore the rehearsal state and rerun critical web and MCP smoke tests. A backup not restored is unproven.",q:"Measured recovery time and successful smoke tests."}]},
{n:5,t:"Perform the production cutover",p:"Use a brief write freeze and one final migration. Do not introduce indefinite dual-write.",g:"Production canary healthy",x:[
{o:"sean",t:"Capture the production Neon rollback point",d:"Verify PITR or snapshot readiness and record the exact production database and web-app state.",q:"Named recovery point and rollback sequence."},
{o:"kouhei",t:"Freeze Render writes and take final export",d:"Stop MCP database mutations and prove no request can create new Render-only state.",q:"Freeze timestamp and final export checksum."},
{o:"kouhei",t:"Run the final MCP data migration",d:"Apply approved Drizzle migrations through the migration role, load final rows, and reconcile.",q:"Zero unresolved reconciliation differences."},
{o:"sean",t:"Approve the production Neon target",d:"Verify the migration changed only approved MCP objects and the target is ready for Render.",q:"Schema diff and grants accepted."},
{o:"kouhei",t:"Switch the MCP service to Neon",d:"Use the pooled runtime connection, keep direct access only in the migration job, deploy, and canary.",q:"Production MCP health and tool canaries pass."},
{o:"joint",t:"Reopen traffic after both canaries pass",d:"Sean verifies Neon and web behavior. Kouhei verifies MCP and Render behavior. Either may stop the cutover.",q:"Joint go-live record with both SHAs."}]},
{n:6,t:"Stabilize and retire Render Postgres",p:"Keep a time-bounded rollback option, then remove the duplicate database and its credentials.",g:"Render DB retired",x:[
{o:"kouhei",t:"Observe MCP production",d:"Monitor Render health, database errors, latency, idempotency conflicts, Temporal links, and tool failures.",q:"Clean window with no Render writes."},
{o:"sean",t:"Observe Neon and the chatbot",d:"Monitor connections, query latency, usage settlement, chat saves, ownership, shares, stars, and confirmed orders.",q:"Clean application and database report."},
{o:"kouhei",t:"Archive and delete Render Postgres",d:"Take the final encrypted export, verify restore instructions, remove the resource, and delete obsolete variables.",q:"Resource removed and archive checksum recorded."},
{o:"sean",t:"Rotate Neon credentials",d:"Invalidate temporary migration credentials and retain only least-privilege runtime roles in managed secret stores.",q:"Rotation record with owner and date, never values."},
{o:"joint",t:"Close the migration and lock the boundary",d:"Confirm one platform, no duplicate writers, no obsolete secrets, and no unresolved ownership.",q:"Final runbook and matrix approved."}]}
];
var names={sean:"Sean",kouhei:"Kouhei",joint:"Joint gate"};
var root=document.getElementById("phases");
function safe(s){return String(s).replace(/[&<>\"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;"}[c]})}
function draw(){root.innerHTML=phases.map(function(p){return '<article class="phase"><div class="phase-top"><div class="phase-num">'+p.n+'</div><div><h3>'+safe(p.t)+'</h3><p class="purpose">'+safe(p.p)+'</p></div><span class="gate">Gate · '+safe(p.g)+'</span></div><div class="tasks">'+p.x.map(function(t,i){var id="p"+p.n+"t"+i;return '<article class="task '+t.o+'" data-owner="'+t.o+'" data-id="'+id+'"><input class="check" type="checkbox" aria-label="Complete '+safe(t.t)+'"><span class="pill '+t.o+'">'+names[t.o]+'</span><h4>'+safe(t.t)+'</h4><p>'+safe(t.d)+'</p><p class="proof"><strong>Proof:</strong> '+safe(t.q)+'</p></article>'}).join("")+'</div></article>'}).join("");bind()}
var store={};try{store=JSON.parse(localStorage.getItem("pckup-db-plan-v1")||"{}")||{}}catch(e){store={}}
function progress(){var all=[].slice.call(document.querySelectorAll(".check"));var done=all.filter(function(x){return x.checked}).length;var pct=all.length?Math.round(done/all.length*100):0;document.getElementById("fill").style.width=pct+"%";document.getElementById("percent").textContent=pct+"%"}
function bind(){[].slice.call(document.querySelectorAll(".task")).forEach(function(card){var box=card.querySelector(".check");if(store[card.dataset.id]){box.checked=true;card.classList.add("done")}box.addEventListener("change",function(){card.classList.toggle("done",box.checked);store[card.dataset.id]=box.checked;localStorage.setItem("pckup-db-plan-v1",JSON.stringify(store));progress()})});progress()}
draw();
[].slice.call(document.querySelectorAll(".filter")).forEach(function(b){b.addEventListener("click",function(){var f=b.dataset.filter;document.querySelectorAll(".filter").forEach(function(x){x.classList.toggle("on",x===b)});document.querySelectorAll(".task").forEach(function(x){x.classList.toggle("hide",f!=="all"&&x.dataset.owner!==f)})})});
document.getElementById("print").addEventListener("click",function(){window.print()});
})();