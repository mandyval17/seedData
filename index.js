import pkg from 'pg';
const { Client } = pkg;

function randomTimeStamp(startYear, endYear) {
  const startDate = new Date(startYear, 0, 1).getTime();
  const endDate = new Date(endYear, 11, 31, 23, 59, 59, 999).getTime();
  const randomTime = startDate + Math.random() * (endDate - startDate);
  const date = new Date(randomTime);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

const client = new Client({
  connectionString: 'postgresql://postgres.fcauqqwiqvcgexfslqud:mayur9898SH$@aws-0-ap-south-1.pooler.supabase.com:6543/postgres',
});

await client.connect();
async function insertLogData(start, end) {

  const tableName = '"Audits"';
  const insertQuery = `
    INSERT INTO ${tableName} (
      id, timestamp, action, description, method, "userId", module
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  try {
    for (let i = 1; i <= 10_000_000; i++) {
      const id = randomTimeStamp(start, end);
      const timestamp = randomTimeStamp(start, end);
      const action = "LOGIN";
      const description = "User admin logged in";
      const method = "POST";
      const userId = '08847a55-66af-435c-8e2e-f8ee3c28ac89';
      const module = "Auth";

      const values = [id, timestamp, action, description, method, userId, module];
      try {
        await client.query(insertQuery, values);
      } catch (error) {
        console.log(`${i} Failed`);
      }
      console.log(`${i}`);
    }

    console.log("All log entries inserted successfully!");
  } catch (err) {
    console.error("Error inserting log data:", err.message);
  } finally {
    await client.end();
  }
}

insertLogData(2025, 2025);
insertLogData(2024, 2024);
insertLogData(2023, 2023);
