## [microCMSテンプレート] シンプルなECサイト with Stripe Checkout

microCMSで商品情報を管理し、Stripeで決済を行うサンプルテンプレートです。

## スクリーンショット

### TOPページ

https://microcms-template-stripe-simple-commerce.pages.dev/
<img width="1780" alt="スクリーンショット 2023-08-18 23 09 21" src="https://github.com/hideokamoto/microcms-template-stripe-simple-commerce/assets/6883571/38f76713-4020-4e9f-9508-2c6dbd0b09e9">

### 商品詳細ページ

https://microcms-template-stripe-simple-commerce.pages.dev/products/jf2yshouvaf
<img width="1828" alt="スクリーンショット 2023-08-18 23 09 45" src="https://github.com/hideokamoto/microcms-template-stripe-simple-commerce/assets/6883571/24dcb4c8-c5ec-4af4-8d0f-6544a89d0cc6">

### 決済ページ
Stripe Checkoutにリダイレクトします。
<img width="1239" alt="スクリーンショット 2023-08-18 23 09 51" src="https://github.com/hideokamoto/microcms-template-stripe-simple-commerce/assets/6883571/4192a912-070c-487b-a9f5-60b06cf957e4">

## 動作環境

Next.jsが利用できる環境をご利用ください。

- Node.js 16.8 or later.
- macOS, Windows (including WSL), and Linux are supported.

https://nextjs.org/docs/getting-started/installation

## 環境変数の設定方法

このテンプレートでは、以下の３つの環境変数が必要です。

```
# microCMSのAPIキー
MICROCMS_API_KEY=xxxx

# microCMSのサービスドメイン名
MICROCMS_SERVICE_DOMAIN=demo-simple-commerce

# Stripeのシークレットキーまたは制限付きキー
STRIPE_SECRET_API_KEY=sk_test_xxx
```

### StripeのシークレットAPIキーを取得する方法

Stripeのダッシュボードにログインし、テスト環境・本番環境どちらかの[シークレットキー]を取得しましょう。

- テスト環境: https://dashboard.stripe.com/test/apikeys
- 本番環境: https://dashboard.stripe.com/apikeys


## 開発時のコマンド

```bash
npm run dev
```

## 画面プレビューの指定方法

[Products] APIの[API設定]画面で、`https://デプロイしたドメイン/products/{CONTENT_ID}?draft_key={DRAFT_KEY}`を設定しましょう。

設定画面は次のようなURLです: `https://{MICROCMS_SERVICE_DOMAIN}.microcms.io/apis/products/settings/preview`

参考：[画面プレビューの仕組み](https://document.microcms.io/manual/screen-preview)


## [Advanced] microCMS Webhookを利用した商品情報・価格の更新をStripeに同期する方法

microCMS Webhookを利用することで、microCMS側で変更した商品情報や価格をStripeに反映できます。

サンプルAPIとして、`app/api/webhook/route.ts`を用意しました。

このAPIをmicroCMSのWebhookに登録すると、microCMS側で変更した商品名や画像・価格をStripeに同期できます。

ただしこのAPIは、「公開終了時にStripe側のデータを削除・アーカイブすること」や「microCMSで商品情報を公開したタイミングでStripeに同期すること」はできません。

情報変更時の同期のデモAPI・コードとしてお使いください。

なお、Webhhook APIはリクエストの検証を行います。

ドキュメントを参考にシークレットを設定しましょう。

https://document.microcms.io/manual/webhook-setting#hb2d39bd6cc

設定後、環境変数に`MICROCMS_WEBHOOK_SECRET`として保存したシークレットを設定します。

```diff
MICROCMS_API_KEY=xxxx
MICROCMS_SERVICE_DOMAIN=demo-simple-commerce
STRIPE_SECRET_API_KEY=sk_test_xxx
+MICROCMS_WEBHOOK_SECRET=YOUR_SECRET
```