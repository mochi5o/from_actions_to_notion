const core = require('@actions/core');
const { Client, LogLevel } = require('@notionhq/client');

const main = async () => {
  try {
    const notionToken = core.getInput('integrations-token');
    const issueTitle = core.getInput('issue-title');
    const url = core.getInput('url');
    const dbId = core.getInput('db-id');

    if (!notionToken || !issueTitle || !url || !dbId) {
      throw new Error('Missing environment var');
    }
    const notion = new Client({
      auth: notionToken,
      logLevel: LogLevel.DEBUG,
    });
    const parent = {
      database_id: dbId,
    };
    const properties = {
      Title: {
        title: [{ text: { content: issueTitle } }],
      },
      アドレス: {
        url: url,
      },
      Status: {
        select: {
          name: 'not started',
        },
      },
    };
    const response = await notion.pages.create({
      parent: parent,
      properties: properties,
    });
    core.setOutput('response', response);
  } catch (error) {
    core.setFailed(error.message);
  }
};

module.exports = main;
