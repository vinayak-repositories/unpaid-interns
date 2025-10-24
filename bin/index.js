#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { execa } from 'execa';
import ora from 'ora';
import fs from 'fs';


console.log(
    chalk.green(
        figlet.textSync('Unpaid Interns', { horizontalLayout: 'full' })
    )
);

const projectName = ".";


(async () => {
  const spinner = ora("Creating Vite project...").start();

  try {
    // Step 1: Run vite create with auto-template
    await execa("npm", ["create", "vite@latest", ".", "--", "--template", "react"], {
      stdio: "inherit",
    });

    spinner.succeed("Vite project created!");

    const projectPath = `./${projectName}`;

    // Step 2: Install dependencies
    spinner.start("Installing dependencies...");
    await execa("npm", ["install"], { stdio: "inherit" });
    spinner.succeed("Dependencies installed!");

    // Step 3: Install extras
    spinner.start("Installing additional packages (react-router-dom, framer-motion)...");
    await execa("npm", ["install", "react-router-dom", "framer-motion"], { stdio: "inherit" });
    spinner.succeed("Extra packages installed!");

    // Step 4: Print success
    console.log(chalk.greenBright(`\n✅ ${projectName} setup complete!`));
    console.log(chalk.cyan(`\nNext steps:`));
    console.log(chalk.yellow(`cd ${projectName}`));
    console.log(chalk.yellow(`npm run dev`));

  } catch (error) {
    spinner.fail("Something went wrong!");
    console.error(error);
  }
})();