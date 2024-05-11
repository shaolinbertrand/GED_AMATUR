if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const axios =require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');


const cert = fs.readFileSync(
    path.resolve(__dirname,`../certs/${process.env.GN_CERT}`)
);

const agent = new https.Agent({
    pfx: cert,
    passphrase: 'amatur2024'
})

axios({
    method: 'POST',
    url: 'https://oauth.bb.com.br/oauth/token',
    headers: {
        Authorization: `${process.env.BASIC}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    httpsAgent: agent,
    data:{
        grant_type: 'client_credentials'
    }

}).then((response) => console.log(response.data));
/*axios({
    method: 'GET',
    url: 'https://api-pix.bb.com.br/pix/v2/pix',
    params: {
        'gw-dev-app-key': 'e9592d76352e65a16fcd8e0787f940bb',
        inicio: '2024-04-01T00:00:00.000Z',
        fim: '2024-04-05T23:00:00.000Z'
      },
    headers: {
        Authorization: 'Bearer Wote7_tGN1QKIj7MxCYAsotECthZKcUMPaBe8z3_lDcwTqq6VzWjLvE1CRoNyig67x68s0TZAKFtc9DRTeNAtg.BZQsG3rMaUEBqlu_nQlPjjQy3F9sSiEGvh-NuxjrXuFj_LxGO2cLbqiudNxh5gUjxck0gOqOuGvFGQAIcVicpbLUb0-vJduH94iD6iTqKcOTxU5RcRQarSfX7yfPBfaTZlA0jsmuojAKPXaJc2U3WnWuURnKE95cGHD-wrbMrhF8KI3vb8R-PB9_CJAXWtC39Jdc5vDoZ4r-8Y5j3ytBXSzeMUls-id1wLLoMbgbyOWwbVptMrQYh7KAM9gv79e9s6GCuYjNK7cZL_n-mVUjnwedTsIh36sTxf9TOqmdVx_Qr2TM5F0bybcnFd3V0Np5wcT5xBXTqzSb3EcekcSKI1gIYvuiSH8on5Rg0TmlB947cIvJS66ecvSgQbJkhg9UtU8uoUfUC1ZoI7xD4S4fgOxSaF44NbPfdbFg26iARdQmSxahDcn_WgzGTkdX4_jGP1HRp7df1qQf8lWxXiVx_gFxnhAPBSR3WhBQ-IQAhWUS-fRMNkSkuDvKfunZ_rkn3BLj2WuiFx2tjp8PrLNRaTs8G-J4V5sdNH1mkTEeZf78sTBtmia1KkAnfpGCNUv0fDYDJCI9mTp3wFWvW_8_-ZohXIWdGtPp7216rcuHvVfd1IKLsmnaQdO8zjnNMtInPdELJikuh80MpX9X8uaJXdB1x-Y-UW665uBTJZFIwGe5Uffn74iIBsUjp7NSZ8tstUywbzs1NJnobXvSY4J0WzGW0hqmSEo7aRyjO4v44bpvxe32oFR9aAapCDmbWe9m-vhwO9uwe1M6kW24p39jyVwuvRXbsRQ_oebI8VfC_4toWwcqN5wzb4yelVsUecVRr1mj-8iFUkjnDsxIPbRAZcdiSNs7F_pg3rittbDvSUnzfKIMpoJeuK3wAJcx7I9NA4aqTRNmMmJEJZtM7-EEJ0ckqKEDqcqqj5Ze389CdbX1UbOfIYF6KetIlNxIu65CFm2YpR_Ad-j8byp0pMrH--TeAVCBAYQ5Lo0kAAAF4IzyLzGvMy4FOATU6qiX9iJBhBj6n32RT8VDKo-X1DdqgqL-tSpLxLe8qqdRupYoL86-tLfmUGt_OqL0YjEIYSK9yrpncpTFr0mPRpBz9djU3HPcthWaCvf_QE78nqN_EVI.pNCHcuj-HnNlvtm_OmsgR0WMPGz743AFFpOIHhodHqfHLZ4MYV5RSYF3iJE9vPnTCr0eVje7b1QhrycOGJT_-Q',
        'Content-Type': 'application/json'
    },
    httpsAgent: agent,
    data:{
        grant_type: 'client_credentials'
    }

}).then((response) => console.log(response.data));*/


//console.log(process.env);
//console.log(cert);

/*curl --request GET \
  --url 'https://api-pix.bb.com.br/pix/v2/pix?gw-dev-app-key=e9592d76352e65a16fcd8e0787f940bb&inicio=2024-01-01T00%3A00%3A00.000Z&fim=2024-01-01T18%3A00%3A00.000Z' \
  --header 'Authorization: Bearer TYdu8TtvRZV5q4p6ro9IJBIIWEtR-sTMZPaGjCHe3zqPESwNL7BQfLzuMgvfptXKEk9lNze2zlMufFWYxpNYvQ.75qhs2nyPqHgxE4FOnAiLHTrIS-iiwHpuP3DSWuXb7sdWugiSPBUWBNh_1dSCHDqUVgdR20L8UEYJbF9_XbULDBjBUnAntjOY41-B-ZhErMz23WDkMcvIXvhNLh_L_gVeuCuZ8yK6O_HfahKCVt5-C4ZGkiJIXe-tgmTVidnsHjAQfpyy_gNowWLGBO0jtNiF8ezshvl9ScuswxJodOMfHy-Zwnr-Q-OZAEk5e6bHKq7a0dm6v_bJrYiVpSqJkuJ4DDOyl7MkWjsqmKBhEkNCHDcaAnD6_ZXpMfO20mF-AHii2_-h2AARLjWScmDq78xjn5kF1xBk14RG1UzJEXYw1G0UndKYTsqLaUJDnLDRfJiepLL5Zt15TPhXIICUZ43_bR2kdtZP0nyheQBBr4iNOpldbYP8rOEXAtwfVIhIFFgnwfOe6_fNM6b0vzHfW4vp4mX2J3ORsJP1k3i250QfVf4rDGDdvfyhjFlhgqdkiLXsWvBwDCHKMXNWCbtNG0HlPr9UbGsSdctOuzdEv7mc8Td0AOSfmh4B8UJ5A6U58NmFaaY0KzzZ_mvFEObXevR7w-7Wmn1CZeqOqns5s2BpPnIV2IvEtM-Ye0pEhJ7JqkU597oxI8LPT4k8sJjcjcL9JbZrBcRomY8YaeQEp1TxcWRBDk5-qHdg6wCjNcd7hNAClC8xfnAy7JdYjqRANPQxt3-Hy-dBgXHFKxbpnt_hytxiZ_C4TZt4pZEAaU2oiyGc7uMbnBnd34-szkovtlQ6W8D43Kr4B075HVsZN1CHm6I2xFSFoUMltIlIFtnlincKwjCkQxexd2rgf4nkbRc_TP24Em6IlsD3PUIIT1jFSG4CbV77kvOgKHkA4zi6pwYXB5Rxt7FqA8MFF8w8I5NKwY7GYt70x88UPlTSbfy_m8zAhNiTB-3zqEqNMS5pKNXpSSjGU3jsVV88ST_a8VEiltJLYYKsAmvvAn1-olfEwLNR3oWG7M6emypoXw2meqUyiZRkIm8L-osg-mqhgWo4gmi9Z5zl17FDyVlFXFQM756r98p9y8ojCcawCd9-hhVdQcKXHFFzgZv1dZWaDE4ffd2nT47FAHHtvxMzCI8J8_e4YJWwwjeqfy-Av6BB5c.qqiAqYTgTLc8ZEkf0NmwK4MuLMFchcOr-7iEcndO_XbEs6q3ZZOF2-vY_S1ubUgdukm34ZCk_naizdPFqzIBqQ' \
  --header 'Content-Type: application/json' \
  --cookie '2e0e3f4453c76846fed2c2d099b8586d=de0db09bc5b1f6181c2f7a33d15d7dc5; 8569a51ef2f112382dc63b7c06364f8d=050b59072002b6986ac8b6e84356f0df'*/