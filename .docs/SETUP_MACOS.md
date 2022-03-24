# Setup MacOS

> Note: you should't use SUDO in all case

## Install HomeBrew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Install Ruby 2.7.4 (Apple M1 chip required this to work) with rbenv

```sh
brew install rbenv ruby-build
rbenv install 2.7.4
```

> rbenv is a Ruby Version Manager, it help us to upgrade our project Ruby version support in the future for everyone and CI environment
> `.ruby-version` work with rbenv is where we can restrict everyone to use the same Ruby Version to ensure everyone working on the same environment.

## Verify Ruby version

```sh
cd path/to/project/root
ruby -v

# you should see below, arm64 means you are in Apple M1 chip
# ruby 2.7.4p191 (2021-07-07 revision a21a3b7d23) [arm64-darwin21]
```

## Install [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager)

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
command -v nvm # To verify that nvm has been installed
# you should see nvm
```

## Install Node with NVM

```sh
nvm install --lts
```

## Install Watchman (Optional and Recommended)

```sh
brew install watchman
```
