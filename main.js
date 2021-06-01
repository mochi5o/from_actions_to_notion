const core = require('@actions/core');
const { Client, LogLevel } = require('@notionhq/client');

const notionToken = core.getInput('integrations-token');
const issueTitle = core.getInput('issue-title');
const url = core.getInput('url');
const dbId = core.getInput('db-id');
const notion = new Client({
  auth: notionToken,
  logLevel: LogLevel.DEBUG,
});

const main = async () => {
  try {
    const parent = {
      database_id: dbId,
    };
    const properties = {
      Title: {
        title: [{ text: { content: issueTitle } }],
      },
      Url: {
        url: url,
      },
      Status: {
        select: {
          name: 'not started',
        },
      },
    };
    const newPage = await notion.pages.create({
      parent: parent,
      properties: properties,
    });
    core.setOutput('new-page', newPage);
  } catch (error) {
    core.setFailed(error.message);
  }
};

module.exports = main;
