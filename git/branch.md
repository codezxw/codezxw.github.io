# 分支

分支是 Git 最重要的概念之一，也是最常用的操作之一。几乎所有 Git 操作流程都离不开分支。

`git branch`命令可以列出本地的所有分支。

```bash
$ git branch
```

创建一个名为`MyBranch`的新分支，但是依然停留在当前分支。

```bash
$ git branch MyBranch
```

在远程主机`origin`上创建一个`MyBranch`的分支，并与本地的同名分支建立追踪关系。

```bash
$ git push -u origin MyBranch
```

将当前分支改名为`MyBranch`。

```bash
$ git branch -m MyBranch
```

删除`MyBranch`分支，前提是该分支没有未合并的变动。

```bash
$ git branch -d MyBranch
```

强制删除`MyBranch`分支，不管有没有未合并变化。

```bash
$ git branch -D MyBranch
```

切换到`MyBranch`分支，当前的工作区会变为`MyBranch`分支的内容。

```bash
$ git checkout MyBranch
```

基于`MyBranch`分支创建一个新的`NewBranch`分支，新的`NewBranch`分支将成为当前的工作区。

```bash
$ git checkout -b NewBranch MyBranch
```

# 内部实现

## .git 目录

版本管理的所有信息，保存在项目的`.git`目录之中。如果没有这个目录，Git 就会认为这个仓库没有建立版本管理，必须进行初始化。`git init`命令的主要作用，就是建立`.git`目录。

`.git/config`文件保存仓库的设置。

`.git/HEAD`文件保存当前工作分支的引用。

`.git/hooks`目录保存各种事件挂钩的脚本。

`.git/objects`目录保存文件的内容，格式是二进制`blob`。

## 哈希签名

每次提交的时候，每个文件、每个树节点（目录）和提交本身，都会生成一个40个字符长的 SHA-1 哈希。

哈希作为文件名，文件本身保留在`.git/objects`目录之中。

## git add 命令

`git add`会将变动的文件写入`.git/objects`目录。它内部调用的是`git hash-object`命令,该命令会计算 SHA-1 哈希，并将 blob 文件放入`.git/objects`目录。

```bash
$ git hash-object -w myfile.txt
```

`git cat-file`命令可以查看 blob 格式对应的原始文件内容。

```bash
$ git cat-file -p e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
```

## git commit 命令

`git commit`命令用于有变动的、并已提交到`.git/objects`的文件写入历史。

`git write-tree`为当前仓库创建树节点。

```bash
$ git write-tree
```

`git commit-tree`命令将指定的树节点写入历史。

```bash
$ echo“first commit”| git commit-tree \ 6e9432aeedbad83fbffb7f8aae4a5d1ab50b7fdf
```
# 标签

## 推送

标签必须单独推送。也就是说，`git push`命令默认不会推送标签，必须使用`--tags`参数。

```bash
$ git push && git push --tags
```

上面的命令先推送新的 commit，成功后再单独推送标签。

`--follow-tags`参数会使得 commit 以及与之相关的标签（注意，不是所有的标签）一起推送。

```bash
$ git push --follow-tags
```

Git 有一个对应于`--follow-tags`的配置项，默认是关闭的。如果将它打开，以后执行`git push`的时候，默认就会带上`--follow-tags`。

```
$ git config --global push.followTags true
```
