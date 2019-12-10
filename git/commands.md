# git add

## 概述

`git add`命令用于将变化的文件，从工作区提交到暂存区。它的作用就是告诉 Git，下一次哪些变化需要保存到仓库区。用户可以使用`git status`命令查看目前的暂存区放置了哪些文件。

```bash
# 将指定文件放入暂存区
$ git add <file>

# 将指定目录下所有变化的文件，放入暂存区
$ git add <directory>

# 将当前目录下所有变化的文件，放入暂存区
$ git add .
```

## 参数

`-u`参数表示只添加暂存区已有的文件（包括删除操作），但不添加新增的文件。

```bash
$ git add -u
```

`-A`或者`--all`参数表示追踪所有操作，包括新增、修改和删除。

```bash
$ git add -A
```

Git 2.0 版开始，`-A`参数成为默认，即`git add .`等同于`git add -A`。

`-f`参数表示强制添加某个文件，不管`.gitignore`是否包含了这个文件。

```bash
$ git add -f <fileName>
```

`-p`参数表示进入交互模式，指定哪些修改需要添加到暂存区。即使是同一个文件，也可以只提交部分变动。

```bash
$ git add -p
```

注意，Git 2.0 版以前，`git add`默认不追踪删除操作。即在工作区删除一个文件后，`git add`命令不会将这个变化提交到暂存区，导致这个文件继续存在于历史中。Git 2.0 改变了这个行为。

## 实现细节

通过`git add`这个命令，工作区里面那些新建或修改过的文件，会加入`.git/objects/`目录，文件名是文件内容的 SHA1 哈希值。`git add`命令同时还将这些文件的文件名和对应的哈希值，写入`.git/index`文件，每一行对应一个文件。

下面是`.git/index`文件的内容。

```
data/letter.txt 5e40c0877058c504203932e5136051cf3cd3519b
```

上面代码表示，`data/letter.txt`文件的哈希值是`5e40c087...`。可以根据这个哈希值到`.git/objects/`目录下找到添加后的文件。

# git branch

`git branch`是分支操作命令。

```bash
# 列出所有本地分支
$ git branch

# 列出所有本地分支和远程分支
$ git branch -a
```

（1）新建一个分支

直接在`git branch`后面跟上分支名，就表示新建该分支。

```bash
$ git branch develop
```

新建一个分支，指向当前 commit。本质是在`refs/heads/`目录中生成一个文件，文件名为分支名，内容为当前 commit 的哈希值。

注意，创建后，还是停留在原来分支，需要用`git checkout`切换到新建分支。

```bash
$ git checkout develop
```

使用`-b`参数，可以新建的同时，切换到新分支。

```bash
$ git checkout -b NewBranch MyBranch
```

（2）删除分支

`-d`参数用来删除一个分支，前提是该分支没有未合并的变动。

```bash
$ git branch -d <分支名>
```

强制删除一个分支，不管有没有未合并变化。

```bash
$ git branch -D <分支名>
```

（3）分支改名

```bash
$ git checkout -b twitter-experiment feature132
$ git branch -d feature132
```

另一种写法

```bash
# 为当前分支改名
$ git branch -m twitter-experiment

# 为指定分支改名
$ git branch -m feature132 twitter-experiment

# 如果有重名分支，强制改名
$ git branch -m feature132 twitter-experiment
```

（4）查看 merge 情况

```bash
# Shows branches that are all merged in to your current branch
$ git branch --merged

# Shows branches that are not merged in to your current branch
$ git branch --no-merged
```

## 命令行参数

### -d

`-d`参数用于删除一个指定分支。

```bash
$ git branch -d <branchname>
```
# git cat-file

`git cat-file`命令显示一个Git对象文件的内容。

```bash
$ git cat-file -p aaa96
```

`p`参数表示以易于阅读的格式显示。

# git checkout

`git checkout`命令有多种用途。

（1）用来切换分支。

```bash
$ git checkout
```

上面命令表示回到先前所在的分支。

```bash
$ git checkout develop
```

上面命令表示切换到`develop`分支。

（2）切换到指定快照（commit）

```bash
$ git checkout <commitID>
```

（3）将工作区指定的文件恢复到上次commit的状态。

```bash
# 将指定文件从暂存区复制到工作区，
# 用来丢弃工作区对该文件的修改
$ git checkout -- <filename>

# 还可以指定从某个 commit 恢复指定文件，
# 这会同时改变暂存区和工作区
$ git checkout HEAD~ -- <filename>
```

`-p`参数表示进入交互模式，只恢复部分变化。

```bash
$ git checkout -p
```

（4）切换到某个tag

```bash
$ git checkout tags/1.1.4
# 或者
$ git checkout 1.1.4
```

上面第二种用法的前提是，本地不能有叫做1.1.4的分支。

## 参数

`-b`用于生成一个新的分支。

```bash
$ git checkout -b new
```

# git cherry-pick

`git cherry-pick`命令"复制"一个提交节点并在当前分支做一次完全一样的新提交。

```bash
$ git cherry-pick 2c33a
```

# git clone

`git clone`命令用于克隆远程分支。

```bash
$ git clone alpha delta --bare
```

上面命令表示将alpha目录（必须是git代码仓库），克隆到delta目录。bare参数表示delta目录只有仓库区，没有工作区和暂存区，即delta目录中就是.git目录的内容。

# git commit-tree

根据一个树对象，生成新的commit对象。

```bash
$ git commit-tree 16e19f -m “First commit”
```

# git commit

`git commit`命令用于将暂存区中的变化提交到仓库区。

`-m`参数用于指定 commit 信息，是必需的。如果省略`-m`参数，`git commit`会自动打开文本编辑器，要求输入。

```bash
$ git commit -m "message"
```

`git commit`命令可以跳过暂存区，直接将文件从工作区提交到仓库区。

```bash
$ git commit <filename>  -m "message"
```

上面命令会将工作区中指定文件的变化，先添加到暂存区，然后再将暂存区提交到仓库区。

## 命令行参数

### -a

`-a`参数用于先将所有工作区的变动文件，提交到暂存区，再运行`git commit`。用了`-a`参数，就不用执行`git add .`命令了。

```bash
$ git commit -am "message"
```

如果没有指定提交说明，运行下面的命令会直接打开默认的文本编辑器，让用户撰写提交说明。

```bash
$ git commit -a
```

### --allow-empty

`--allow-empty`参数用于没有提交信息的 commit。

```bash
$ git commit --allow-empty
```

### --amend

`--amend`参数用于撤销上一次 commit，然后生成一个新的 commit。

```bash
$ git commit --amend - m "new commit message"
```

### --fixup

`--fixup`参数的含义是，当前添加的 commit 是以前某一个 commit 的修正。以后执行互动式的`git rebase`的时候，这两个 commit 将会合并成一个。

```bash
$ git commit --fixup <commit>
```

执行上面的命令，提交说明将自动生成，即在目标 commit 的提交说明的最前面，添加“fixup! ”这个词。

### -m

`-m`参数用于添加提交说明。

```bash
$ git commit -m "message"
```

### --squash

`--squash`参数的作用与`--fixup`类似，表示当前添加的 commit 应该与以前某一个 commit 合并成一个，以后执行互动式的`git rebase`的时候，这两个 commit 将会合并成一个。

```bash
$ git commit --squash <commit>
```

# git diff

`git diff`命令用于查看文件之间的差异。

```bash
# 查看工作区与暂存区的差异
$ git diff

# 查看某个文件的工作区与暂存区的差异
$ git diff file.txt

# 查看暂存区与当前 commit 的差异
$ git diff --cached

# 查看两个commit的差异
$ git diff <commitBefore> <commitAfter>

# 查看暂存区与仓库区的差异
$ git diff --cached

# 查看工作区与上一次commit之间的差异
# 即如果执行 git commit -a，将提交的文件
$ git diff HEAD

# 查看工作区与某个 commit 的差异
$ git diff <commit>

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 查看工作区与当前分支上一次提交的差异，但是局限于test文件
$ git diff HEAD -- ./test

# 查看当前分支上一次提交与上上一次提交之间的差异
$ git diff HEAD -- ./test

# 生成patch
$ git format-patch master --stdout > mypatch.patch
```

比较两个分支

```bash
# 查看topic分支与master分支最新提交之间的差异
$ git diff topic master

# 与上一条命令相同
$ git diff topic..master

# 查看自从topic分支建立以后，master分支发生的变化
$ git diff topic...master
```

# git hash-object

`git hash-object`命令计算一个文件的git对象ID，即SHA1的哈希值。

```bash
$ echo "hello" | git hash-object --stdin
$ echo "hola" | git hash-object -w --stdin

```

参数

- w 将对象写入对象数据库
- stdin 表示从标准输入读取，而不是从本地文件读取。

# git init

`git init`命令将当前目录转为git仓库。

它会在当前目录下生成一个.git子目录，在其中写入git的配置和项目的快照。

# git log

`git log`命令按照提交时间从最晚到最早的顺序，列出所有 commit。

```bash
# 列出当前分支的版本历史
$ git log

# 列出某个文件的版本历史，包括文件改名
$ git log --follow [file]
```

查看远程分支的变动情况。

```bash
$ git log remote/branch
```

查找log，即搜索commit信息。

```bash
$ git log --author=Andy
$ git log -i --grep="Something in the message"
```

上面代码中，`-i`参数表示搜索时忽略大小写。

查看某个范围内的commit

```bash
$ git log origin/master..new
# [old]..[new] - everything you haven't pushed yet
```

美化输出。

```bash
git log --graph --decorate --pretty=oneline --abbrev-commit
```

- --graph commit之间将展示连线
- --decorate 显示commit里面的分支
- --pretty=oneline 只显示commit信息的标题
- --abbrev-commit 只显示commit SHA1的前7位

## 命令行参数

### --oneline

`git log`默认输出每个 commit 的详细信息，为了节省空间，`--oneline`参数让输出时，每个 commit 只占用一行。

```bash
$ git log --oneline --decorate
ccc3333 (HEAD, my-feature-branch) A third commit
bbb2222 A second commit
aaa1111 A first commit
9999999 (master) Old stuff on master
```

# git ls-files

```bash
# 列出没有被.gitignore忽视的文件
$ git ls-files --other --ignored --exclude-standard
```

# git merge

将当前分支合并到指定分支。

```bash
$ git merge develop

```

将当前分支与develop分支合并，产生的新的commit对象有两个父节点。

如果“指定分支”本身是当前分支的一个直接子节点，则会产生fast-forward合并，即合并不会产生新的节点，只是让当前分支指向“指定分支”的最新commit。

Git合并所采用的方法是Three-way merge，及合并的时候除了要合併的兩個檔案，還加上它们共同的父节点。这样可以大大減少人為處理 conflict 的情況。如果采用two-way merge，則只用兩個檔案進行合併（svn默认就是这种合并方法。）

# git pull

```bash
# 合并指定分支到当前分支
$ git pull . topic/branch
```

即使当前分支有没有 commit 的变动，也可以使用`git pull`从远程拉取分支。

# git rebase

git rebase 将当前分支移植到指定分支或指定commit之上。

```bash
$ git rebase -i <commit>
```

互动的rebase。

```bash
$ git rebase -i master~3
```

## 命令行参数

### --autosquash

`--autosquash`参数用于互动模式，必须与`-i`参数配合使用。它会使得以前通过`git commit --fixup`和`git commit --squash`提交的 commit，按照指定的顺序排列（实质是选择提交说明以以`fixup!`或`squash!`开头的 commit），即`--fixup`的 commit 直接排在它所对应的 commit 的后面。

```bash
$ git rebase --interactive --autosquash <branch>
```

### --continue

`--continue`参数用于解决冲突以后，继续执行 rebase。

```bash
$ git rebase --continue
```

### -i，--interactive

`-i`参数会打开互动模式，让用户选择定制`rebase`的行为。

```bash
$ git rebase -i develop
```

# git ref-parse

显示某个指示符的SHA1哈希值。

```bash
$ git ref-parse HEAD
```

# git remote

为远程仓库添加别名。

```bash
$ git remote add john git@github.com:johnsomeone/someproject.git

# 显示所有的远程主机
$ git remote -v

# 列出某个主机的详细信息
$ git remote show name
```

`git remote`命令的实质是在`.git/config`文件添加下面的内容。

```
$ git remote add bravo ../bravo
```

```
[remote "bravo"]
    url = ../bravo/
```

# git reset

`git reset`命令用于将当前分支指向另一个位置。

```bash
# 将当期分支的指针倒退三个 commit，
# 并且会改变暂存区
$ git reset HEAD~3

# 倒退指针的同时，不改变暂存区
$ git reset --soft HEAD~3

# 倒退指针的同时，改变工作区
$ git reset --hard HEAD~3
```

如果不指定回滚的位置，那么等同于撤销修改。

```bash
# 撤销上一次向暂存区添加的所有文件
$ git reset

# 无任何效果
$ git reset --soft

# 同时撤销暂存区和工作区的修改，
# 回复到上一次提交的状态
$ git reset --hard

# 撤销上一次向暂存区添加的某个指定文件，
# 不影响工作区中的该文件
$ git reset -- <filename>
```

## 参数

- soft: 不改变工作区和缓存区，只移动 HEAD 到指定 commit。
- mixed: 只改变缓存区，不改变工作区。这是默认参数，通常用于撤销`git add`。
- hard：改变工作区和暂存区到指定 commit。该参数等同于重置，可能会引起数据损失。`git reset --hard`等同于`git reset --hard HEAD`。
- `-p`表示键入交互模式，指定暂存区的哪些部分需要撤销。

```bash
# Undo add
$ git reset

# Undo a commit，不重置工作区和缓存区
# 回到 HEAD 之前的那个 commit
$ git reset --soft HEAD^

# Undo a commit，重置工作区和缓存区
# 连续撤销三个 commit：HEAD, HEAD^, and HEAD~2
$ git reset --hard HEAD~3

# 从暂存区移除指定文件，但不改变工作区中的该文件
$ git reset -- frotz.c
```

# git revert

`git revert`命令用于撤销commit。

```bash
$ git revert <commitID>
```



# git rm

`git rm`命令用于删除文件。

解除追踪某个文件，即该文件已被`git add`添加，然后抵消这个操作。

```bash
$ git rm --cached <fileName>
```

# git show

`git show`命令用于查看commit的内容

```bash
# 输出某次提交的元数据和内容变化
$ git show [commit]

$ git show 12a86bc38 # By revision
$ git show v1.0.1 # By tag
$ git show feature132 # By branch name
$ git show 12a86bc38^ # Parent of a commit
$ git show 12a86bc38~2 # Grandparent of a commit
$ git show feature132@{yesterday} # Time relative
$ git show feature132@{2.hours.ago} # Time relative
```

# git stash

`git stash`命令用于暂时保存没有提交的工作。运行该命令后，所有没有commit的代码，都会暂时从工作区移除，回到上次commit时的状态。

它处于`git reset --hard`（完全放弃还修改了一半的代码）与`git commit`（提交代码）命令之间，很类似于“暂停”按钮。

```bash
# 暂时保存没有提交的工作
$ git stash
Saved working directory and index state WIP on workbranch: 56cd5d4 Revert "update old files"
HEAD is now at 56cd5d4 Revert "update old files"

# 列出所有暂时保存的工作
$ git stash list
stash@{0}: WIP on workbranch: 56cd5d4 Revert "update old files"
stash@{1}: WIP on project1: 1dd87ea commit "fix typos and grammar"

# 恢复某个暂时保存的工作
$ git stash apply stash@{1}

# 恢复最近一次stash的文件
$ git stash pop

# 丢弃最近一次stash的文件
$ git stash drop

# 删除所有的stash
$ git stash clear
```

上面命令会将所有已提交到暂存区，以及没有提交的修改，都进行内部保存，没有将工作区恢复到上一次commit的状态。

使用下面的命令，取回内部保存的变化，它会与当前工作区的代码合并。

```bash
$ git stash pop
```

这时，如果与当前工作区的代码有冲突，需要手动调整。

`git stash`命令可以运行多次，保存多个未提交的修改。这些修改以“先进后出”的stack结构保存。

`git stash list`命令查看内部保存的多次修改。

```bash
$ git stash list
stash@{0}: WIP on new-feature: 5cedccc Try something crazy
stash@{1}: WIP on new-feature: 9f44b34 Take a different direction
stash@{2}: WIP on new-feature: 5acd291 Begin new feature
```

上面命令假设曾经运行过`git stash`命令三次。

`git stash pop`命令总是取出最近一次的修改，但是可以用`git stash apply`指定取出某一次的修改。

```bash
$ git stash apply stash@{1}
```

上面命令不会自动删除取出的修改，需要手动删除。

```bash
$ git stash drop stash@{1}
```

git stash 子命令一览。

```bash
# 展示目前存在的stash
$ git stash show -p

# 切换回stash
$ git stash pop

# 清除stash
$ git stash clear
```

# git tag

`git tag`命令用于为 commit 打标签。Tag 分两种：普通tag和注解tag。只有annotated tag 才會產生 object。

```bash
$ git tag tmp # 生成.git/refs/tags/tmp
$ git tag -a release
$ git tag -a [VERSION] -m "released [VERSION]"
```

上面代码表示为当前commit打上一个带注解的标签，标签名为release。

普通标签的写法。

```bash
$ git tag 1.0.0
$ git push --tags

$ git tag v0.0.1
$ git push origin master --tags
```

# git update-index

将工作区的文件加入缓存区域。

```bash
$ git update-index --add --cacheinfo \
100644 5c1b14949828006ed75a3e8858957f86a2f7e2eb hola.txt
```

直接将缓存信息插入缓存文件。


## 参考链接

- [Auto-squashing Git Commits](https://robots.thoughtbot.com/autosquashing-git-commits), by George Brocklehurst
- Ryan Hodson, [Quick Tip: Leveraging the Power of Git Stash](http://code.tutsplus.com/tutorials/quick-tip-leveraging-the-power-of-git-stash--cms-22988)
