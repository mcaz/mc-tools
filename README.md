# McTools


## setup

### プロジェクト新規作成
```
$ npm run setup:create
```

### 既存プロジェクト
```
$ npm run setup:create
```

#### コマンド内容
- docker起動
- .clasprc.json作成
- claspログイン
- プロジェクト作成 (プロジェクト新規作成のみ)
- プロジェクト選択・クローン (既存プロジェクトのみ)

___

## コマンド

### docker起動
```
$ npm run docker:up
```

### docker終了
```
$ npm run docker:down
```

### 監視・ビルド
```
$ npm run source:watch
```

### スクリプトプッシュ
```
$ npm run source:push
```

___

## ディレクトリ構成
```
.
├── Dockerfile
├── README.md
├── dist
│   ├── appsscript.json
│   └── main.gs
├── docker-compose.yml
├── package-lock.json
├── package.json
├── src
│   ├── config
│   │   ├── alias.ts
│   │   └── db.ts
│   ├── db
│   │   ├── grow.ts
│   │   ├── seeds
│   │   │   ├── authorities.ts
│   │   │   ├── country.ts
│   │   │   └── users.ts
│   │   └── tables
│   │       ├── authorities.ts
│   │       ├── countries.ts
│   │       ├── covid19.ts
│   │       ├── user_repogitries.ts
│   │       └── users.ts
│   ├── main.ts
│   └── modules
│       ├── mc_record
│       │   └── index.ts
│       ├── mc_sheet
│       │   ├── data.ts
│       │   ├── index.ts
│       │   ├── interface.ts
│       │   └── views.ts
│       ├── mc_ss
│       │   └── index.ts
│       ├── mc_table
│       │   ├── index.ts
│       │   ├── interface.ts
│       │   └── mixins
│       │       ├── dcl.ts
│       │       ├── ddl.ts
│       │       ├── dml.ts
│       │       └── iterater.ts
│       └── utils
│           ├── array.ts
│           ├── is.ts
│           ├── mixin.ts
│           └── object.ts
├── tsconfig.json
├── webpack.config.js
└── yarn.lock

```