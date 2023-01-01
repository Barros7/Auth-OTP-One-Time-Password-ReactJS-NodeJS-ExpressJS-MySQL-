/*const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcrypt')

// ######################################################
// ################### DEFINIÇÕES #######################
// ######################################################


const Cliente = sequelize.define('cliente',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO nome do cliente não pode estar vazio.\x1b[0m'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO email do cliente não pode estar vazio. Os orçamentos são enviados para lá!\x1b[0m'
                },
                isEmail: {
                    args: true,
                    msg: '\x1b[31mO email inserido não é válido.\x1b[0m'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mA password não pode estar vazia.\x1b[0m'
                }
            }
        },
        n_livros: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO nome do cliente não pode estar vazio.\x1b[0m'
                }
            }
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO nome do cliente não pode estar vazio.\x1b[0m'
                }
            }
        },
        tlm: { type: DataTypes.INTEGER },
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)
const Categoria = sequelize.define('categoria',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO autor do livro não pode estar vazio.\x1b[0m'
                }
            }
        }, 
        n_livros: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO autor do livro não pode estar vazio.\x1b[0m'
                }
            }
        }, 
        
    },
)
const Livro = sequelize.define('livro',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO titulo do livro não pode estar vazio.\x1b[0m'
                }
            }
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO autor do livro não pode estar vazio.\x1b[0m'
                }
            }
        }, 
        sinopse: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mA sinopse do livro não pode estar vazia.\x1b[0m'
                }
            }
        }, 
        foto: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mA foto do livro não pode estar vazia.\x1b[0m'
                }
            }
        },  
        
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO stock do livro não pode estar vazia.\x1b[0m'
                }
            }
        },
        
        classificacao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO stock do livro não pode estar vazia.\x1b[0m'
                }
            }
        }, 
        n_lido: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO stock do livro não pode estar vazia.\x1b[0m'
                }
            }
        }, 
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO stock do livro não pode estar vazia.\x1b[0m'
                }
            }
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mA foto do livro não pode estar vazia.\x1b[0m'
                }
            }
        },  
        
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)
Categoria.hasMany(Livro, {
    foreignKey: {
        name: 'id_categoria',
        allowNull: false
    }
})
Livro.belongsTo(Categoria, {
    foreignKey: {
        name: 'id_categoria',
        allowNull: false
    }
})
const Cliente_Livro = sequelize.define('cliente_livro',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO titulo do livro não pode estar vazio.\x1b[0m'
                }
            }
        },
        classificacao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO stock do livro não pode estar vazia.\x1b[0m'
                }
            }
        }, 
        autor: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO autor do livro não pode estar vazio.\x1b[0m'
                }
            }
        }, 
        sinopse: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mA sinopse do livro não pode estar vazia.\x1b[0m'
                }
            }
        }, 
        foto: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mA foto do livro não pode estar vazia.\x1b[0m'
                }
            }
        },  
        
        id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO stock do livro não pode estar vazia.\x1b[0m'
                }
            }
        }, 
        lido: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO lido não pode estar vazio.\x1b[0m'
                }
            }
        },
        
        categoria: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mA foto do livro não pode estar vazia.\x1b[0m'
                }
            }
        },  
        
        
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        
        
    },
)
Cliente.hasMany(Cliente_Livro, {
    foreignKey: {
        name: 'id_cliente',
        allowNull: false
    }
})
Cliente_Livro.belongsTo(Cliente, {
    foreignKey: {
        name: 'id_cliente',
        allowNull: false
    }
})
Livro.hasMany(Cliente_Livro, {
    foreignKey: {
        name: 'id_livro',
        allowNull: false
    }
})
Cliente_Livro.belongsTo(Livro, {
    foreignKey: {
        name: 'id_livro',
        allowNull: false
    }
})
const Cliente_Categoria = sequelize.define('cliente_categoria',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO autor do livro não pode estar vazio.\x1b[0m'
                }
            }
        }, 
    },
)
Cliente.hasMany(Cliente_Categoria, {
    foreignKey: {
        name: 'id_cliente',
        allowNull: false
    }
})
Cliente_Categoria.belongsTo(Cliente, {
    foreignKey: {
        name: 'id_cliente',
        allowNull: false
    }
})
Categoria.hasMany(Cliente_Categoria, {
    foreignKey: {
        name: 'id_categoria',
        allowNull: false
    }
})
Cliente_Categoria.belongsTo(Categoria, {
    foreignKey: {
        name: 'id_categoria',
        allowNull: false
    }
})


const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: '\x1b[31mO email não pode estar vazio.\x1b[0m'
            },
            isEmail: {
                args: true,
                msg: '\x1b[31mO email inserido não é válido.\x1b[0m'
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: '\x1b[31mO username não pode estar vazio.\x1b[0m'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: '\x1b[31mA password não pode estar vazia.\x1b[0m'
            }
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
})

User.beforeCreate(user => {

    return bcrypt.hash(user.password, 10)
        .then(hash => { user.password = hash; })
        .catch(err => { throw new Error(err); });
});

const UserRole = sequelize.define('user_role', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    obs: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
})

UserRole.hasMany(User, {
    foreignKey: {
        name: 'role_id',
        allowNull: false
    }
})
User.belongsTo(UserRole, {
    foreignKey: {
        name: 'role_id',
        allowNull: false
    }
})

// a visita só precisa do id do form associado e da data de criação


module.exports = {
    Livro,
    Cliente,
    Cliente_Livro,
    Cliente_Categoria,
    Categoria,
    User,
    UserRole
}*/