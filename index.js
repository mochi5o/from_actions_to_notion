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
    const dbId = core.getInput('db-id')
    const parent = {
      database_id: dbId
    }
    const properties = {
      Title: {
        title: [{ text: { content: issueTitle } }]
      },
      Url: {
        url: url
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
