const core = require('@actions/core');
const { Client } = require('@notionhq/client');

jest.mock('core');
jest.mock('Client');

describe('main', () => {
  beforeEach(() => {
    const issueTitle = 'this is test issue';
    const url = 'https://example.com',
    const dbId = 'xxxxxxxx',
    const notionToken = 'oooooooo',
  });
  describe("#randomFloat", () => {
  it("成功する", () => {

  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));


  });
});
  

}