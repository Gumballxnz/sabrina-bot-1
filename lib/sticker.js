const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegPath);
const fs = require('fs');
const path = require('path');
const { tmpdir } = require('os');
const crypto = require('crypto');

async function imageToWebp(media) {
    const tmpFileInst = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`);
    const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);

    fs.writeFileSync(tmpFileInst, media);

    return new Promise((resolve, reject) => {
        ffmpeg(tmpFileInst)
            .on('error', (e) => {
                fs.unlinkSync(tmpFileInst);
                reject(e);
            })
            .on('end', () => {
                fs.unlinkSync(tmpFileInst);
                resolve(fs.readFileSync(tmpFileOut));
                fs.unlinkSync(tmpFileOut);
            })
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
            ])
            .toFormat('webp')
            .save(tmpFileOut);
    });
}

async function videoToWebp(media) {
    const tmpFileInst = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`);
    const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);

    fs.writeFileSync(tmpFileInst, media);

    return new Promise((resolve, reject) => {
        ffmpeg(tmpFileInst)
            .on('error', (e) => {
                fs.unlinkSync(tmpFileInst);
                reject(e);
            })
            .on('end', () => {
                fs.unlinkSync(tmpFileInst);
                resolve(fs.readFileSync(tmpFileOut));
                fs.unlinkSync(tmpFileOut);
            })
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00.0",
                "-t",
                "00:00:05.0",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat('webp')
            .save(tmpFileOut);
    });
}

module.exports = { imageToWebp, videoToWebp };
