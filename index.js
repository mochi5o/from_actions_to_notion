const core = require('@actions/core');
const github = require('@actions/github');
const { Client, LogLevel } = require('@notionhq/client')

async function run() {
  try {
    const notionToken = core.getInput('integrations-token');
    const notion = new Client({
      auth: notionToken,
      logLevel: LogLevel.DEBUG,
    });
    const issueTitle = core.getInput('issue-title');
    const url = core.getInput('url');
    const parent = {
      database_id: 'dfc2cdc260ae476c8f2f5d4065f9a94a'
    }

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

    const newPage = await notion.pages.create({
      parent: parent,
      properties: properties
    })
    console.log(newPage);
  } catch (error) {
    console.error(error);
  }
}
run()
