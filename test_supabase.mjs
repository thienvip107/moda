const url = 'https://wedelvydreumqskcmgxx.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlZGVsdnlkcmV1bXFza2NtZ3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NzgwMTEsImV4cCI6MjEwMDI1NDAxMX0.JVgdOq6nPAr3UJUy6QOiaFEmKrqg18SKS9mYB-9V9Ww';

async function queryTable(table) {
  try {
    const res = await fetch(`${url}/rest/v1/${table}?select=*`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`❌ Table ${table} HTTP ${res.status}:`, err);
      return;
    }

    const data = await res.json();
    console.log(`✅ Table '${table}': ${data.length} rows`);
    if (data.length > 0) {
      console.log(`   Sample item:`, JSON.stringify(data[0]).substring(0, 120));
    }
  } catch (err) {
    console.error(`❌ Table '${table}' Error:`, err.message);
  }
}

async function main() {
  console.log('--- CHECK SUPABASE REST API ---');
  const tables = ['banners', 'news', 'products', 'projects', 'events', 'policies', 'site_settings'];
  for (const t of tables) {
    await queryTable(t);
  }
}

main();
