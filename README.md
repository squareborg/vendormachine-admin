🛒🤖 VendorMachine™
===================
A free and opensource multi vendor Marketplace
--------------------------

# Notice
**Work in progress. Check back in a few months**


`API CircleCI` ![API Build Status](https://circleci.com/gh/squareborg/vendormachine-api.png?circle-token=:circle-token)

API Repo: https://github.com/squareborg/vendormachine-api  
OpenAPI Documentation: https://vendormachine-api.herokuapp.com/api/documentation

Frontend Demo: https://vendormachine-frontend.herokuapp.com  
username: `admin@vendormachine.test`  
password: `password`  

username: `user@vendormachine.test`  
password: `password`  

Roadmap
-----------

- [ ] Admin
    - [x] Login
    - [ ] Vendor Management
        - [x] Create - basic
        - [x] Edit - basic
        - [ ] Delete `#mvp`
    - [ ] Import 
      - [ ] WooCommerce
      - [ ] Magento
      - [ ] Shopify  
- [ ] Authentication
    - [ ] Registration
        - [x]  Sign Up Form
        - [x]  Email Verification
        - [ ]  SMS Verification
    - [x] Login
    - [ ] 2FA `#mvp`
- [ ] Vendors
    - [ ] Vendor Model fleshed out fields `#mvp`
    - [ ] Onboarding `#mvp`
        - [x] Onboarding screen - will need expanding with the vendor model
    - [ ] Multi User per vendor
    - [ ] Vendor Dashboard
      - [ ] Sales Stats `#mvp`
- [ ] Products
  - [ ] Flesh out what a product is `#mvp`
  - [ ] Create Page 
    - [x] Basic `#mvp`
    - [ ] Rich Text `#mvp`
    - [ ] Tags `#mvp`
    - [ ] Category `#mvp`
    - [ ] Attributes `#mvp`
    - [ ] Images `#mvp`
- [ ] Store Front
  - [ ]  Web `#mvp`
  - [ ]  Mobile `React Native`
    - [ ] ios
    - [ ] Android 
  


## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
