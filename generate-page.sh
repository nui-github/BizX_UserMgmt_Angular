ng g component $1/$2/components/$2 --skip-import

ng g service $1/$2/services/$2

ng g module $1/$2 --routing

ng g class $1/$2/models/$2 --type=model

# $1 = Directory module
# $2 = Module name
# Command = ./generate-module.sh ${directory.module} ${module.name}
# For example = ./generate-module.sh standard/pages login
