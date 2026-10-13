// Only local files are read. No upload, transcription or video rendering.
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const folder = path.join(root, "public", "projects", "Family-Swimming");
const clips = [
  ["18363149322960.mp4", 9.5, 6],
  ["18363151551184.mp4", 2.5, 6],
  ["18363154500304.mp4", 19, 5],
  ["18363149847248.mp4", 17, 8.5],
  ["18363154500304.mp4", 31, 7],
];
const missing = [...new Set(clips.map(([file]) => file))].filter(
  (file) => !fs.existsSync(path.join(folder, file)),
);
if (missing.length) {
  console.error(
    "Place these originals in " + folder + ":\n" + missing.join("\n"),
  );
  process.exit(1);
}
const args = ["-v", "error"];
const filters = [];
clips.forEach(([file, start, duration], i) => {
  args.push(
    "-ss",
    String(start),
    "-t",
    String(duration),
    "-i",
    path.join(folder, file),
  );
  filters.push(
    `[${i}:a]asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.85,afade=t=in:d=0.08,afade=t=out:st=${duration - 0.12}:d=0.12[a${i}]`,
  );
});
filters.push(
  clips.map((_, i) => `[a${i}]`).join("") + "concat=n=5:v=0:a=1[out]",
);
const temp = path.join(folder, "natural-preparing.wav");
args.push("-filter_complex", filters.join(";"), "-map", "[out]", "-y", temp);
const result = spawnSync(process.env.FFMPEG || "ffmpeg", args, {
  stdio: "inherit",
});
if (result.error || result.status !== 0) {
  if (fs.existsSync(temp)) fs.unlinkSync(temp);
  console.error(
    result.error
      ? result.error.message
      : "Audio preparation failed. Check FFmpeg and original audio streams.",
  );
  process.exit(1);
}
fs.renameSync(temp, path.join(folder, "natural.wav"));
console.log(
  "Ready: Family-Swimming, 32.5 seconds. No video has been rendered.",
);
