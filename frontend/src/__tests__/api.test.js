global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ username: "tester" })
  })
);

test("fetch user", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ username: "tester" }),
    })
  );

  const res = await fetch("/api/user/");
  const data = await res.json();

  expect(data.username).toBe("tester");
});

