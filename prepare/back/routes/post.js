const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    res.json({id: 1, content: 'hello'});
})

router.delete('/', (req, res) => {
    res.json({id: 1});
})

module.exports = router;

// 노드는 웹팩을 안쓰기 때문에 Import, export default를 사용하는 것이 아닌 require와 module.exports를 사용한다