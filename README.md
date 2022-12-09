# ActionsからNotionに投稿するテスト

[![labeled actions](https://github.com/mochi5o/from_actions_to_notion/actions/workflows/main.yml/badge.svg)](https://github.com/mochi5o/from_actions_to_notion/actions/workflows/main.yml)
[![CI](https://github.com/mochi5o/from_actions_to_notion/actions/workflows/ci.yml/badge.svg)](https://github.com/mochi5o/from_actions_to_notion/actions/workflows/ci.yml)

## 準備

secretに以下を登録
- ACCESS_TOKEN
  - Githubのアクセストークン
- NOTION_TOKEN
  - Notion側でIntegrationsを設定した時のアクセスキー

Actions側
- 検知したいラベルを登録

## 使い方
- このActionsを設定したRepoでissueに設定したラベルをつけると、NotionにissueタイトルとissueのURLが投稿される
