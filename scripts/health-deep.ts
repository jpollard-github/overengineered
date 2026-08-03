const url = process.env.API_URL
  ? `${process.env.API_URL}/health/deep`
  : "http://localhost:4001/health/deep";
try {
  const response = await fetch(url);
  console.log(JSON.stringify(await response.json(), null, 2));
  if (!response.ok) process.exitCode = 1;
} catch (error) {
  console.error(
    `Deep health unavailable at ${url}: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
}
