# Schnorr NIZK simple

## How to work for code
two type for command
```js
node index.js PK datayouwant
node index.js input datayouwant
```

or just for default
```js
node index.js
```

## 測試 solidity Verify (R,z) 是否相同 (suscess)

schnorrZKP
R : Uint8Array -> string("***")
z : bigint -> string("0x***")

R and z 皆輸出 hex string  
R 0x04全部移除確保兩邊hash的答案一致 
z 04移除
EX: 
R
//"0x0453c7ad67822d262abca805ceb474d2134bb2d61ea300ae77f754434e48dbe9ef572253080a8c4e2182276a8e687964a24c39b04c969e816697480048bbbedb88"
R
//"53c7ad67822d262abca805ceb474d2134bb2d61ea300ae77f754434e48dbe9ef572253080a8c4e2182276a8e687964a24c39b04c969e816697480048bbbedb88"

2. zG
R Z
目前先從zG測試單邊 node與solidity是否相同  可先寫死測試 (suscess)

3. R + c*PK
兩邊相同  (suscess)

###  測試schnorrZKP與solidity (suscess)
私鑰不改  隨機 R (suscess).
私鑰改變  隨機 R (suscess).
