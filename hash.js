const { hash, compare } = require('bcrypt');

hash('123456', 8)
.then(encrypted => console.log('Enc: ' + encrypted))
.catch(err => console.log('Err: ' + err.message));

compare('123456', '$2a$08$NL0LMA0UPr5/5AOWo7z54uR5a3UnrSeXBIg4vnptXEv5pH9spqSAS')
.then(same => console.log('Is same: ' + same))
.catch(err => console.log('Err: ' + err.message));
