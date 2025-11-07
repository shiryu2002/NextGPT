# NextGPT アーキテクチャドキュメント

## 概要
「わからせンクラテス！」は、OpenAI GPTと対話しながらお題を当てるゲームアプリケーションです。
Next.js (Pages Router) + TypeScript/JavaScript + Prisma + PostgreSQL で構築されています。

## ディレクトリ構造

```
NextGPT/
├── pages/                    # Next.js Pages Router
│   ├── _app.tsx             # アプリケーションルート
│   ├── index.tsx            # ホームページ (トップページ)
│   ├── api/                 # APIルート
│   │   ├── generate.js      # [未使用] GPT生成API
│   │   ├── judge.js         # ユーザー入力を判定するGPT API
│   │   ├── addComment.ts    # コメント追加API
│   │   ├── addOdai.ts       # お題追加API
│   │   ├── addRank.ts       # ランキング追加API
│   │   ├── getComments.ts   # コメント一覧取得API
│   │   ├── getOdaiList.ts   # お題一覧取得API
│   │   ├── getRandomOdai.ts # ランダムお題取得API
│   │   ├── getRanking.ts    # ランキング取得API
│   │   ├── getResult.ts     # 対戦結果取得API
│   │   ├── getResultList.ts # 対戦結果一覧取得API
│   │   ├── getSpecificOdai.ts # 特定お題取得API
│   │   └── submitResult.ts  # 対戦結果保存API
│   ├── game/                # ゲームメインページ
│   │   └── index.tsx
│   ├── rank/                # ランキングページ
│   │   └── index.tsx
│   ├── odai/                # お題一覧ページ
│   │   └── index.tsx
│   ├── odaiCreate/          # お題作成ページ
│   │   └── index.tsx
│   ├── result/              # 対戦結果詳細ページ
│   │   └── index.tsx
│   ├── resultList/          # 対戦結果一覧ページ
│   │   └── index.tsx
│   ├── info/                # インフォメーションページ
│   │   └── index.tsx
│   ├── aboutGPT/            # GPT説明ページ
│   │   └── index.tsx
│   ├── github/              # GitHub情報ページ
│   │   └── index.tsx
│   └── debug/               # デバッグページ
│       └── index.tsx
├── components/              # 共有コンポーネント
│   ├── Sidebar.js           # サイドバーナビゲーション
│   ├── SidebarData.js       # サイドバーメニューデータ
│   ├── conversation.tsx     # 会話表示コンポーネント
│   ├── examples.js          # 例示データ
│   ├── examples-before.js   # [未使用] 例示データ (旧)
│   └── BasicModal.js        # [未使用] モーダルコンポーネント
├── repo/                    # データアクセス層 (Repository Pattern)
│   ├── odaiRepo.ts          # お題リポジトリ
│   ├── rankingRepo.ts       # ランキングリポジトリ
│   ├── resultRepo.ts        # 対戦結果リポジトリ
│   └── commentRepo.ts       # コメントリポジトリ
├── lib/                     # ユーティリティ・ライブラリ
│   └── gtag.js              # Google Analytics設定
├── styles/                  # スタイルファイル
│   └── global.module.css    # グローバルスタイル
├── prisma/                  # Prismaスキーマ
│   └── schema.prisma        # データベーススキーマ定義
└── public/                  # 静的ファイル (画像等)

```

## データモデル (Prisma Schema)

### Rank
- ランキングデータ
- フィールド: id, name, score, createdAt, odai

### Odai
- お題データ
- フィールド: id, ng (NGワード配列), odai, limit, createdAt, like, dislike, score, official, name

### Result
- 対戦結果データ
- フィールド: id, name, odaiId, result (JSON), score, createdAt, odai, ng, count

### Comment
- コメントデータ
- フィールド: id, name, comment, createdAt

## ページ詳細

### 1. ホームページ (`/`)
- **ファイル**: `pages/index.tsx`
- **機能**: アプリケーションの説明とゲーム開始ボタン
- **使用コンポーネント**: Sidebar
- **状態管理**: なし (静的表示)

### 2. ゲームページ (`/game`)
- **ファイル**: `pages/game/index.tsx`
- **機能**: メインゲーム画面。ユーザーがGPTと対話してお題を当てるゲーム
- **クエリパラメータ**: `OdaiId` (オプション、特定のお題でプレイ)
- **主要な状態**:
  - `game`: ゲーム状態 (playing/win/lose)
  - `odai`: 現在のお題
  - `NG`: NGワード配列
  - `result`: 会話履歴
  - `limit`: 残り回数
  - `userScore`: ユーザースコア
- **API連携**:
  - `/api/judge` - ユーザー入力を判定
  - `/api/getSpecificOdai` - 特定お題取得
  - `/api/getRandomOdai` - ランダムお題取得
  - `/api/getRanking` - ランキング取得
  - `/api/addRank` - ランキング登録
  - `/api/submitResult` - 対戦結果保存
- **使用コンポーネント**: Sidebar, Modal (react-modal), Conv, Material-UI (CircularProgress, Icons)
- **ローカルストレージ**: お題、NGワード、制限回数、スコア

### 3. ランキングページ (`/rank`)
- **ファイル**: `pages/rank/index.tsx`
- **機能**: ハイスコアランキング表示
- **API連携**: `/api/getRanking`
- **ローカルストレージ**: rankingData (キャッシュ)
- **自動更新**: 3分ごと

### 4. お題一覧ページ (`/odai`)
- **ファイル**: `pages/odai/index.tsx`
- **機能**: お題リスト表示、お題選択してゲーム開始
- **API連携**: `/api/getOdaiList`
- **フィルター**: 公式お題のみ表示
- **ローカルストレージ**: odaiList (キャッシュ)
- **自動更新**: 2分ごと

### 5. お題作成ページ (`/odaiCreate`)
- **ファイル**: `pages/odaiCreate/index.tsx`
- **機能**: 新しいお題の投稿フォーム
- **API連携**: `/api/addOdai`
- **入力項目**: 名前、お題、NGワード、制限回数、スコア (管理者のみ)
- **管理者機能**: 公式お題フラグ (パスワード認証)

### 6. 対戦結果詳細ページ (`/result`)
- **ファイル**: `pages/result/index.tsx`
- **機能**: 特定の対戦結果を表示
- **クエリパラメータ**: `resultId` (必須)
- **API連携**: `/api/getResult`
- **機能**: 同じお題でプレイ可能

### 7. 対戦結果一覧ページ (`/resultList`)
- **ファイル**: `pages/resultList/index.tsx`
- **機能**: 全ての対戦結果を一覧表示
- **API連携**: `/api/getResultList`
- **ローカルストレージ**: resultListData (キャッシュ)

### 8. インフォページ (`/info`)
- **ファイル**: `pages/info/index.tsx`
- **機能**: コメント機能、外部リンク (アンケート、Twitter等)
- **API連携**:
  - `/api/getComments` - コメント一覧取得
  - `/api/addComment` - コメント追加
- **自動更新**: 10秒ごと
- **ローカルストレージ**: commentList (キャッシュ)

### 9. GPT説明ページ (`/aboutGPT`)
- **ファイル**: `pages/aboutGPT/index.tsx`
- **機能**: GPTや生成AIについての説明 (内容未実装)

### 10. GitHubページ (`/github`)
- **ファイル**: `pages/github/index.tsx`
- **機能**: GitHubリポジトリへのリンク (内容未実装)

### 11. デバッグページ (`/debug`)
- **ファイル**: `pages/debug/index.tsx`
- **機能**: 開発用デバッグ機能

## コンポーネント詳細

### Sidebar (`components/Sidebar.js`)
- ナビゲーションバー (サイドバー)
- Material-UI アイコン使用
- 現在のパスに応じたアクティブ状態表示
- レスポンシブ対応 (モバイル・デスクトップ)

### SidebarData (`components/SidebarData.js`)
- サイドバーメニュー項目のデータ定義
- アイコン、タイトル、パスの配列

### Conv (`components/conversation.tsx`)
- 会話バブル表示コンポーネント
- user/bot の2種類に対応

### examples (`components/examples.js`)
- ゲーム開始時のチュートリアル的な会話例

## API ルート詳細

### GPT関連
- **`/api/judge`** (POST): ユーザーの入力を判定し、GPTからの応答を返す
- **`/api/generate`** (未使用): GPT生成API

### お題関連
- **`/api/getOdaiList`** (GET): 全てのお題を取得
- **`/api/getRandomOdai`** (GET): ランダムなお題を1つ取得
- **`/api/getSpecificOdai`** (GET): 特定のお題を取得 (クエリ: `id`)
- **`/api/addOdai`** (POST): 新しいお題を追加

### ランキング関連
- **`/api/getRanking`** (GET): ランキングデータを取得
- **`/api/addRank`** (POST): ランキングに新規登録

### 対戦結果関連
- **`/api/submitResult`** (POST): 対戦結果を保存
- **`/api/getResult`** (GET): 特定の対戦結果を取得 (クエリ: `resultId`)
- **`/api/getResultList`** (GET): 全ての対戦結果を取得

### コメント関連
- **`/api/getComments`** (GET): コメント一覧を取得
- **`/api/addComment`** (POST): 新しいコメントを追加

## Repository層

データアクセスロジックをカプセル化したリポジトリパターンを採用。

### odaiRepo.ts
- `addOdai()`: お題追加
- `getSpecificOdai()`: 特定お題取得
- `getOdaiList()`: お題一覧取得
- `updateOdai()`: お題更新

### rankingRepo.ts
- ランキング関連のデータアクセス

### resultRepo.ts
- 対戦結果関連のデータアクセス

### commentRepo.ts
- `addComment()`: コメント追加
- `getCommentList()`: コメント一覧取得

## 技術スタック

### フロントエンド
- **Next.js**: 13.1.1 (Pages Router)
- **React**: 18.2.0
- **TypeScript**: 5.1.6
- **Material-UI**: 5.14.4 (UI コンポーネント、アイコン)
- **Framer Motion**: 10.16.4 (アニメーション)
- **TailwindCSS**: カスタムスタイリング
- **react-modal**: モーダル表示
- **react-share**: Twitterシェア機能

### バックエンド
- **Prisma**: 5.1.1 (ORM)
- **PostgreSQL**: データベース (@vercel/postgres)
- **OpenAI API**: 3.3.0 (GPT-3.5-turbo使用)

### その他
- **Google Analytics**: トラッキング (gtag)
- **Vercel**: デプロイ環境

## 現在の課題点

### コード品質
1. **TypeScriptとJavaScriptの混在**: コンポーネントによってTS/JS混在
2. **型定義の不足**: 多くの箇所で型定義が不十分 (strict: false)
3. **重複コード**: 各ページで似たようなローカルストレージ処理、fetch処理が散在
4. **責務の不明確さ**: ページコンポーネントが大きすぎ、ビジネスロジックとUI混在
5. **エラーハンドリング**: 統一されたエラーハンドリングがない
6. **命名規則**: キャメルケース、パスカルケース、スネークケースが混在

### アーキテクチャ
1. **サービス層の不在**: ビジネスロジックがページコンポーネントに直接記述
2. **状態管理**: Reactの useState のみで、複雑な状態管理なし
3. **APIクライアント**: fetch の直接使用、統一されたAPIクライアント層がない
4. **カスタムフック**: ロジックの再利用性が低い
5. **ローカルストレージ**: キャッシュロジックが各ページに散在

### UI/UX
1. **会話表示**: ゲームページに直接記述、再利用性が低い
2. **モーダル**: react-modal を使用しているが、統一されたモーダルコンポーネントがない
3. **ローディング表示**: CircularProgress が各所に散在

### セキュリティ
1. **環境変数**: クライアント側で管理者パスワード使用 (`NEXT_PUBLIC_ADMIN_PASS`)
2. **入力バリデーション**: サーバー側の検証が不十分

### パフォーマンス
1. **不要な依存関係**: React Native関連の不要なパッケージ
2. **画像最適化**: Next.js Image コンポーネントの使用が不統一

## リファクタリング推奨事項

### フェーズ1: 基盤整備
1. 全ファイルのTypeScript移行
2. 厳密な型定義の追加
3. 共通型定義ファイルの作成 (`types/`)

### フェーズ2: レイヤー分離
1. サービス層の追加 (`services/`)
   - gameService.ts
   - odaiService.ts
   - rankingService.ts
   - resultService.ts
   - commentService.ts
2. APIクライアント層の追加 (`lib/api/`)
   - apiClient.ts (共通fetch wrapper)
3. カスタムフック層の追加 (`hooks/`)
   - useOdai.ts
   - useRanking.ts
   - useResult.ts
   - useLocalStorage.ts

### フェーズ3: コンポーネント整理
1. 共通UIコンポーネントの抽出 (`components/ui/`)
   - Button
   - Modal
   - Loading
   - ErrorBoundary
2. ドメイン固有コンポーネントの整理 (`components/`)
   - GameBoard
   - ConversationList
   - OdaiCard
   - RankingList
3. レイアウトコンポーネント (`components/layout/`)
   - Layout (Sidebar含む)

### フェーズ4: 機能改善
1. エラーハンドリングの統一
2. ローディング状態の統一
3. トースト通知の実装
4. フォームバリデーションの強化

### フェーズ5: パフォーマンス最適化
1. 不要な依存関係の削除
2. 画像最適化
3. コード分割
4. メモ化の適用

## 注意事項
- Pages Routerを維持 (App Routerへの移行なし)
- レスポンシブデザインを崩さない
- 画面の見た目を極力変更しない
- shadcn/ui のみUIライブラリ追加を許可 (Material-UIは既存のまま共存)
