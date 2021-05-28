const core = require('@actions/core');
const github = require('@actions/github');
const { Client, LogLevel } = require("@notionhq/client")
const notionToken = core.getInput('integrations-token');
const notion = new Client({
  auth: notionToken,
  logLevel: LogLevel.DEBUG,
});
const issueTitle = core.getInput('issue-title');
const url = core.getInput('url');

async function run() {
  try {

    const parent = {
          database_id: 'dfc2cdc260ae476c8f2f5d4065f9a94a'
        };

    const properties = {
      Name: {
        type: "title",
        title: [{ "text": { "content": "POST Data" } }]
      },
      Tags: {
        type: "rich_text",
        rich_text: [{ "text": { "content": "actions" } }]
      },
      Price: {
        type: "number",
        number: 500
      },
      Date: {
        type: "date",
        date: { "start": "2021-05-11" }
      },
      Status: {
        select: {
          name: "complete"
        }
      }
    }

    const newPage = await notion.pages.create({
      parent: {
        database_id: 'dfc2cdc260ae476c8f2f5d4065f9a94a',
      },
      propaties: properties
    })
  } catch (error) {
    console.error(error)
  }
}

run()
