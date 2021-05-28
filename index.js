const core = require('@actions/core');
const github = require('@actions/github');
const { Client } = require("@notionhq/client")

async function run() {
  try {
    const notion = new Client({ auth: notionToken });

    const issueTitle = core.getInput('issue-title');
    const url = core.getInput('url');
    const notionToken = core.getInput('integrations-token');
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
    const newPage = await notion.databases.query({
      parent: parent,
      propaties: properties
    })
  } catch (error) {
    console.error(error)
  }
}

run()
