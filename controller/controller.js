const fetch = require("node-fetch");
module.exports = {
    findText: async (req, res) => {
        try {
            let number = req.params.n;
            await fetch(`https://terriblytinytales.com/test.txt`)
                .then(response => response.text())
                .then(data => {
                    const words = data.replace(/[0-9_]|\W|[#$%^&*()]/g, " ").split(/\s+/g);
                    var freq = {};
                    words.forEach(function (c) {
                        c = c.toLowerCase();
                        if (!freq[c]) {
                            freq[c] = 0;
                        }
                        freq[c] += 1;
                    });
                    const tmpList = {};
                    while (Object.keys(freq).length) {
                        var key = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
                        tmpList[key] = freq[key];
                        delete freq[key];
                    }
                    freq = tmpList;
                    const len = Object.keys(freq).length;
                    if (number < len) {   
                        let resList=[];                      
                        for (var key in freq) {
                            let list = {};
                            list['word'] = key;
                            list['frequency'] = freq[key];
                            console.log(list);
                            resList.push(list);
                            number-=1
                            if (number== 0) {
                                break;
                            }
                        }
                        res.json(resList);

                    } else {
                        res.status(404).json({ message: "Requested number is more than the present words" })
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        } catch (err) {
            console.log(err)
        }
    }
}