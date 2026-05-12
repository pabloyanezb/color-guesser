import { useHighScoresStore } from "@/store/highscoresStore";

beforeEach(() => {
  localStorage.clear();
  useHighScoresStore.setState({
    activePlayerName: "",
    entries: [],
  });
});

describe("setActivePlayerName", () => {
  it("sets the active player name", () => {
    useHighScoresStore.getState().setActivePlayerName("PAB");
    expect(useHighScoresStore.getState().activePlayerName).toBe("PAB");
  });

  it("trims the player name", () => {
    useHighScoresStore.getState().setActivePlayerName("  PAB  ");
    expect(useHighScoresStore.getState().activePlayerName).toBe("PAB");
  });
});

describe("addHighScore", () => {
  it("adds a score entry for a player", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 95.5,
      roundScores: [90, 95, 100],
    });

    const { entries, activePlayerName } = useHighScoresStore.getState();
    expect(entries).toHaveLength(1);
    expect(entries[0].playerName).toBe("PAB");
    expect(entries[0].finalScore).toBe(95.5);
    expect(entries[0].roundScores).toEqual([90, 95, 100]);
    expect(entries[0].id).toContain("PAB-");
    expect(entries[0].createdAt).toBeDefined();
    expect(activePlayerName).toBe("PAB");
  });

  it("rounds finalScore to 1 decimal", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 95.56,
      roundScores: [90, 95, 100],
    });

    const entry = useHighScoresStore.getState().entries[0];
    expect(entry.finalScore).toBe(95.6);
  });

  it("trims player name before saving", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "  PAB  ",
      finalScore: 95.5,
      roundScores: [90, 95, 100],
    });

    const entry = useHighScoresStore.getState().entries[0];
    expect(entry.playerName).toBe("PAB");
  });

  it("does not save when name is empty", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "",
      finalScore: 95.5,
      roundScores: [90, 95, 100],
    });

    expect(useHighScoresStore.getState().entries).toHaveLength(0);
  });

  it("caps entries at 5 per player", () => {
    for (let i = 0; i < 10; i++) {
      useHighScoresStore.getState().addHighScore({
        playerName: "PAB",
        finalScore: 50 + i,
        roundScores: [50 + i],
      });
    }

    const { entries } = useHighScoresStore.getState();
    const pabEntries = entries.filter((e) => e.playerName === "PAB");
    expect(pabEntries).toHaveLength(5);
  });

  it("keeps top 5 scores per player", () => {
    for (let i = 0; i < 10; i++) {
      useHighScoresStore.getState().addHighScore({
        playerName: "PAB",
        finalScore: i,
        roundScores: [i],
      });
    }

    const { entries } = useHighScoresStore.getState();
    const pabEntries = entries.filter((e) => e.playerName === "PAB");
    const scores = pabEntries.map((e) => e.finalScore).sort((a, b) => b - a);
    expect(scores).toEqual([9, 8, 7, 6, 5]);
  });

  it("does not affect other players entries", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 95.5,
      roundScores: [90, 95, 100],
    });

    useHighScoresStore.getState().addHighScore({
      playerName: "XYZ",
      finalScore: 88.0,
      roundScores: [85, 88, 90],
    });

    const { entries } = useHighScoresStore.getState();
    expect(entries).toHaveLength(2);
    expect(entries.filter((e) => e.playerName === "PAB")).toHaveLength(1);
    expect(entries.filter((e) => e.playerName === "XYZ")).toHaveLength(1);
  });
});

describe("getTopFiveForPlayer", () => {
  it("returns entries for the given player", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 95.5,
      roundScores: [90, 95, 100],
    });

    const result = useHighScoresStore.getState().getTopFiveForPlayer("PAB");
    expect(result).toHaveLength(1);
    expect(result[0].finalScore).toBe(95.5);
  });

  it("returns empty array for unknown player", () => {
    const result = useHighScoresStore.getState().getTopFiveForPlayer("ZZZ");
    expect(result).toHaveLength(0);
  });

  it("returns empty array when no name and no active player", () => {
    const result = useHighScoresStore.getState().getTopFiveForPlayer();
    expect(result).toHaveLength(0);
  });

  it("falls back to activePlayerName when no argument given", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 95.5,
      roundScores: [90, 95, 100],
    });

    const result = useHighScoresStore.getState().getTopFiveForPlayer();
    expect(result).toHaveLength(1);
  });

  it("returns at most 5 entries", () => {
    for (let i = 0; i < 10; i++) {
      useHighScoresStore.getState().addHighScore({
        playerName: "PAB",
        finalScore: i,
        roundScores: [i],
      });
    }

    const result = useHighScoresStore.getState().getTopFiveForPlayer("PAB");
    expect(result).toHaveLength(5);
  });

  it("returns scores sorted descending", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 50,
      roundScores: [50],
    });
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 90,
      roundScores: [90],
    });
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 70,
      roundScores: [70],
    });

    const result = useHighScoresStore.getState().getTopFiveForPlayer("PAB");
    expect(result[0].finalScore).toBe(90);
    expect(result[1].finalScore).toBe(70);
    expect(result[2].finalScore).toBe(50);
  });
});

describe("clearHighScores", () => {
  it("clears all entries when no player is active", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 95.5,
      roundScores: [90, 95, 100],
    });
    useHighScoresStore.getState().addHighScore({
      playerName: "XYZ",
      finalScore: 88.0,
      roundScores: [85, 88, 90],
    });

    useHighScoresStore.getState().setActivePlayerName("");
    useHighScoresStore.getState().clearHighScores();
    expect(useHighScoresStore.getState().entries).toHaveLength(0);
  });

  it("clears entries for the active player when no argument", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 95.5,
      roundScores: [90, 95, 100],
    });

    useHighScoresStore.getState().clearHighScores();
    expect(useHighScoresStore.getState().entries).toHaveLength(0);
  });

  it("clears entries for a specific player", () => {
    useHighScoresStore.getState().addHighScore({
      playerName: "PAB",
      finalScore: 95.5,
      roundScores: [90, 95, 100],
    });
    useHighScoresStore.getState().addHighScore({
      playerName: "XYZ",
      finalScore: 88.0,
      roundScores: [85, 88, 90],
    });

    useHighScoresStore.getState().clearHighScores("PAB");
    const { entries } = useHighScoresStore.getState();
    expect(entries).toHaveLength(1);
    expect(entries[0].playerName).toBe("XYZ");
  });
});
