const core = require('@actions/core');
const github = require('@actions/github');
const { Client, LogLevel } = require('@notionhq/client')
const notionToken = core.getInput('integrations-token');
const notion = new Client({
  auth: notionToken,
  logLevel: LogLevel.DEBUG,
});
const issueTitle = core.getInput('issue-title');
const url = core.getInput('url');

async function run() {
  try {

    // const parent = {
    //   'type': 'database_id',
    //   'database_id': '2f26ee68-df30-4251-aad4-8ddc420cba3d'
    // }

    const properties = {
      Name: {
        type: 'title',
        title: [{ text: { content: 'POST Data' } }]
      },
      Tags: {
        type: 'rich_text',
        rich_text: [{ text: { content: 'actions' } }]
      },
      Price: {
        type: 'number',
        number: 500
      },
      Date: {
        type: 'date',
        date: { start: '2021-05-11' }
      },
      Status: {
        type: 'select',
        select: {
          name: 'complete'
        }
      }
    }
    const val = {parent: {
        page_id: '48f8fee9cd794180bc2fec0398253067',
      },
      propaties: properties
    }
    console.log(val);

    const newPage = await notion.pages.create({
      parent: {
        type: 'database_id',
        page_id: '48f8fee9cd794180bc2fec0398253067',
      },
      propaties: properties
    })
    console.log(newPage);
  } catch (error) {
    console.error(error)
  }
}

run()
