# 基于区块链的教育证书系统

​       在传统的教育体系中，所有学历证书，包括学校证书，高等教育证书和其他技能证书都是保存在纸上，把所有这些文件都写在纸上给人们带来了许多弊端。

​		设想这样一个场景:假如这些纸质证书的文件丢失或被盗。在这种情况下，你可能面临的第一个弊端是他人未经授权的情况下便可使用你的文件。第二个弊端是你需要从一个部门跑到另一个部门去获取文件的副本。但是，如果你能以一种安全可靠的方式将你的文档存储在网上，那将解决很多问题。区块链可以为教育部门提供这种解决方案。在区块链上存储文件可节省纸张和打印成本，一旦这些文档存储在区块链上，它们将永远不会丢失，这些文档也不可能被更改或伪造。

​		人们接受适当的教育是找工作的前提要求。对于市场上的每份工作、对每个招聘人都有其特定的资格标准。作为一名求职者，你必须出示你的证书来证明你是否有资格被聘用。如今，为了找工作而伪造学历的行为越来越多。由于存储在区块链上的数据是不可篡改的，并且可溯源验证，所以一些欺诈和伪造的案件就可以很容易地在区块链技术的帮助下被解决。另外，这些分布在区块链这种分布式账本上的教育证书可以很容易地与招聘者共享，这样招聘者就可以在聘用或面试前轻松地核实应聘者的教育信息和判断应聘者是否有对应招聘要求的教育资格。区块链技术甚至可以彻底改变整个教育系统。

# 基于区块链教育证书系统的思维方案：



## 1、基于区块链教育证书系统的架构设计

基于区块链的教育证书系统是一个用于发布教育证书的开源架构，也是一套用于为教育证书生成密码保护的工具。该系统大致由三个部分组成：视图、检查、校验。  

![微信图片_20201213201252](https://i.loli.net/2020/12/13/UgmIVsaYx7j6TAC.png)

**视图简易**：用于查看教育证书信息只需将教育证书文件拖拉上传至系统的检验框，检验完毕即可显示教育证书页面，十分便捷。

**检查教育证书文件是否被篡改**：基于区块链教育证书系统可根据内置在教育证书文件的高级密码保护自动检查拖拉上传至系统检验框的教育证书文件，将教育证书文件内的哈希回执和文件信息与上链信息相比较，从而达到检查教育证书文件是否有效的目的。

**校验**：通过教育证书的数字签名来判断该上传教育证书文件是否被公认机构认证，如若该教育证书的认证机构不是在公认机构范围内，该教育证书即是无效的。若该教育证书既未被篡改，又来自于公认的机构，基于区块链的教育证书系统将读取教育证书文件内的信息，将教育证书渲染并显示于页面。

![微信图片_20201213200434](https://i.loli.net/2020/12/15/xPD7lUfOpLnvQKe.png)

## 2、基于区块链教育证书系统的运作流程：

![微信图片_202012131955223](https://i.loli.net/2020/12/14/Bmp4CeVgG7qIvMY.png)

**①各高校创建区块链教育证书后，教育厅将对其进行数字签名，该签名将与证书中的学生信息一起存储在区块链中。**

各高校均需要申请一个被教育厅所认可的钱包账户（只有通过教育厅认证成功后的钱包账户才可部署基于区块链教育证书的智能合约）。此后各高校将会在每一学年将学生的基本信息和学习记录上链。当毕业季来临时，各高校将用申请成功后的钱包账户部署基于区块链教育证书的智能合约。基于区块链教育证书的合约成功部署后，系统将自动生成包含学生基本信息、学生在校学习记录、对应学生合约回执和生成教育文件时间戳的教育证书文件。各高校的学生教育证书信息录入成功后，基于教育证书审核的智能合约将自动执行。教育厅通过接口对学生教育证书进行数字签名，并且该签名将与证书中的学生信息一起存储在区块链中。

 

**②当将教育证书上传至教育厅发布的教育证书查询系统后，学生可通过区块链钱包账户登入系统得到教育证书文件，实现教育证书确权。**

各高校每名学生都需要创建一个属于自己的区块链钱包账户，教育厅也将搭建一个基于各高校的教育证书验证系统，在教育证书验证系统中有一个教育证书查询系统窗口。教育证书查询系统是用于各高校学生区块链钱包账户登入后查询并获得区块链教育证书文件，教育证书验证系统是用于教育证书文件的防伪验证。在上一步中教育厅对学生教育证书进行数字签名完成后，教育厅随后会将包含此签名的区块链学生教育证书上传至教育证书查询系统中。并且当教育厅将区块链学生教育证书上传至教育证书查询系统成功后，教育厅将无权限对学生区块链教育证书进行任何操作，换句话来说，此时的学生区块链教育证书已被确权，所有权都归与教育证书所关联的私钥所有者也就是学生本人所有。

 

**③当将教育证书上传至教育厅发布的教育证书验证系统时，其内容与存储在区块链上的内容进行比较，系统将检查证书文件内容是否匹配，验证证书是否有效。**

当学生毕业后想查询个人毕业证书时，只需进入教育厅的教育证书查询系统，用第二步创建的区块链钱包账户登录教育证书查询系统查询证书，如若证书已发布，学生可手动将教育证书文件下载至本地。当需要验证区块链教育证书是否被篡改时，只需将下载后的教育证书文件拖拉上传至教育证书验证系统的验证框中。此时教育证书验证系统将会将自动读取上传的教育证书文件，通过读取上传教育证书文件中的合约回执进行区块链信息溯源。合约回执若为无效哈希，系统将无法通过验证，并显示为已被篡改。若合约回执正确，系统会将上链信息与上传教育证书文件中所有信息进行逐一比对。如若上传教育证书文件中的信息与上链信息一致，系统将会通过自动读取上传教育证书文件中的信息，从而渲染并显示出区块链教育证书页面。如若上传教育证书文件中的信息与上链信息不一致，则表明教育证书文件已被篡改，系统将会显示“教育证书已被篡改，无法读取证书信息”的错误提示。

## 3、基于区块链教育证书系统的业务流程：

![微信图片_20201215113244](https://i.loli.net/2020/12/15/fEM1niXqA9soRlH.png)

各高校将学生的基本信息和在校学习记录上链并部署智能合约生成教育证书，教育厅对学生教育证书进行数字签名并发布于教育证书查询系统中。当学生毕业后出去应聘公司时，难免需要出示毕业证书以表明学历成绩是否符合公司招聘标准。如果使用区块链教育证书系统，只需使用个人区块链钱包账户登入系统，即可得到个人的区块链教育证书文件，再将区块链教育证书文件拖拉至系统验证框，即可得到区块链教育证书页面。如若教育证书中有应聘要求之外的学习科目并且学生该成绩恰好分数较低，此时学生可能认为此成绩对应聘将会造成影响，区块链教育证书系统完美地解决了这一问题。该系统支持隐藏部分学习成绩的功能，学生可根据自身形势的需求，调整证书的显示信息，实现个性化需求。隐藏部分信息后的教育证书文件可下载保存。当把此文件拖拉上传至教育证书验证系统的验证框时，教育证书页面将显示学生设计后的证书信息页面。如若他人想查询学生的教育证书信息，首先需要得到学生同意，学生将教育证书文件通过邮件或者微信等传输方式发送给他人，他人即可拿着这份教育证书文件进入教育证书验证系统查询此教育证书信息。但由于查询的教育证书和登入教育证书验证系统的区块链钱包账户不匹配，故每次查询他人教育证书信息都将支付一笔费用给教育证书所有者。并且教育证书所有者可得知自己教育证书被查询的次数和查询方账户，实现查询的信息透明。

所以如果使用区块链教育证书系统，对于证书发布方来说：可节省大量打印成本、纸张成本、信息整理的人工成本；对于证书被授予方来说：无需随身携带各类教育信息，也无需担心教育证书信息丢失，可省略从一个部门到另外部门去盖章或者证书丢失补办证书的相应流程，节省大量时间和精力，还可以在他人查询自身教育证书信息时得到相应的支付报酬并且可得知教育证书所有的被查询信息记录，实现证书确权和查询信息透明的功能；对于证书检验方（就比如上面所说的公司招聘检查官）来说：不必担心证书是否篡改等不信任因素，可在需要的时候多次查询公司成员教育信息。