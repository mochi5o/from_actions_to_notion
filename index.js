const core = require('@actions/core');
const github = require('@actions/github');
const { Client } = require("@notionhq/client")

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }


// async function run() {
//   try {
    const issueTitle = core.getInput("issue-title");
    const url = core.getInput("url");
    const token = core.getInput("repo-token");
    const notionToken = core.getInput("notion-token");

    const octokit = new github.getOctokit(token);
    const notion = new Client({ auth: notionToken });

    // const issueCreate = await octokit.issues.create({
    //   repo: github.context.repo.repo,
    //   owner: github.context.repo.owner,
    //   title: issueTitle,
    //   body: url
    // });
  async function createPageInDatabase(databaseId) {
    // The parent object to add to. Here just the ID of the database but this can also be the id of a page.
    const parent = {
      database_id: 'dfc2cdc260ae476c8f2f5d4065f9a94a',
    };

    const properties = {
      Name: {
        type: 'title',
        title: [{ text: { content: issueTitle } }]
      },
      Url: {
        type: 'rich_text',
        rich_text: [{ text: { content: url } }]
      },
      Status: {
        select: {
          name: "not started"
        }
      }
    }

    const newPage = {
      parent: parent,
      properties: properties,
    };

    const response = await notion.pages.create(newPage);
    console.log(response);
  }

  (async () => {})(createPageInDatabase('DATABASE_ID'));
// }

// run()
