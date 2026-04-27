/**
 * Image Optimization Script
 * Comprimeert alle PNG/JPEG images naar WebP met behoud van kwaliteit
 */

const fs = require("fs");
const path = require("path");

const INPUT_DIR = "./public/images";
const OUTPUT_DIR = "./public/images/optimized";
const QUALITY = 85; // 85% kwaliteit - perfect voor web, visueel identiek

// Kleuren voor console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
  red: "\x1b[31m",
};

async function checkSharp() {
  try {
    require("sharp");
    return true;
  } catch (e) {
    return false;
  }
}

async function optimizeImages() {
  console.log(
    `${colors.blue}🚀 Starting image optimization...${colors.reset}\n`,
  );

  // Check if sharp is installed
  const hasSharp = await checkSharp();
  if (!hasSharp) {
    console.log(`${colors.red}❌ Sharp not found!${colors.reset}`);
    console.log(`${colors.yellow}Installing sharp...${colors.reset}\n`);

    const { execSync } = require("child_process");
    try {
      execSync("npm install sharp", { stdio: "inherit" });
      console.log(
        `${colors.green}✅ Sharp installed successfully!${colors.reset}\n`,
      );
    } catch (error) {
      console.error(
        `${colors.red}Failed to install sharp. Please run: npm install sharp${colors.reset}`,
      );
      process.exit(1);
    }
  }

  const sharp = require("sharp");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all image files
  const files = fs.readdirSync(INPUT_DIR).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".png", ".jpg", ".jpeg"].includes(ext);
  });

  if (files.length === 0) {
    console.log(`${colors.yellow}No images found to optimize${colors.reset}`);
    return;
  }

  console.log(
    `${colors.blue}Found ${files.length} images to optimize${colors.reset}\n`,
  );

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  const results = [];

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputFilename = path.parse(file).name + ".webp";
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    try {
      // Get original file size
      const originalStats = fs.statSync(inputPath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;

      // Optimize and convert to WebP
      await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);

      // Get optimized file size
      const optimizedStats = fs.statSync(outputPath);
      const optimizedSize = optimizedStats.size;
      totalOptimizedSize += optimizedSize;

      const savedBytes = originalSize - optimizedSize;
      const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

      results.push({
        file,
        originalSize: formatBytes(originalSize),
        optimizedSize: formatBytes(optimizedSize),
        saved: formatBytes(savedBytes),
        percent: savedPercent,
      });

      console.log(`${colors.green}✅${colors.reset} ${file}`);
      console.log(
        `   ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${colors.green}-${savedPercent}%${colors.reset})\n`,
      );
    } catch (error) {
      console.error(
        `${colors.red}❌ Error processing ${file}:${colors.reset}`,
        error.message,
      );
    }
  }

  // Summary
  const totalSaved = totalOriginalSize - totalOptimizedSize;
  const totalPercent = ((totalSaved / totalOriginalSize) * 100).toFixed(1);

  console.log(`${colors.blue}${"=".repeat(50)}${colors.reset}`);
  console.log(`${colors.green}🎉 Optimization Complete!${colors.reset}\n`);
  console.log(`📊 Summary:`);
  console.log(`   Original size:  ${formatBytes(totalOriginalSize)}`);
  console.log(`   Optimized size: ${formatBytes(totalOptimizedSize)}`);
  console.log(
    `   ${colors.green}Total saved:    ${formatBytes(totalSaved)} (${totalPercent}%)${colors.reset}\n`,
  );
  console.log(
    `${colors.yellow}📁 Optimized images saved to: ${OUTPUT_DIR}${colors.reset}`,
  );
  console.log(`${colors.yellow}📝 Next steps:${colors.reset}`);
  console.log(`   1. Review images in ${OUTPUT_DIR}`);
  console.log(`   2. If satisfied, replace original images`);
  console.log(`   3. Update image paths in code to use .webp extension`);
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Run the script
optimizeImages().catch(console.error);
