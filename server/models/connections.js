const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const Debtors = require('./subjects/Debtors');
const Contracts = require('./documents/Contracts');
const {PassportTypes} = require("./PassportType");
const Passports = require("./documents/Passport");
const ExecutiveDocs = require("./documents/ExecutiveDocs");
const InitTemplates = require('./templates/initTemplates');
const Creditors = require('./subjects/Creditors');
const Courts = require('./subjects/Courts');
const Agents = require('./subjects/Agents');
const Bailiffs = require('./subjects/Bailiffs');
const Cessions = require('./documents/Cessions');
const CessionsInfo = require('./documents/CessionsInfo');
const CessionsEnclosures = require("./documents/CessionsEnclosures");
const CourtClaims = require("./documents/CourtClaims");
const CourtClaimsStatuses = require("./statuses/CourtClaimsStatuses");
const CourtClaimsTypes = require("./types/CourtClaimsTypes");
const Requisites = require("./documents/Requisites");
const BankRequisites = require("./documents/BankRequisites");
const Payments = require('./documents/Payments');


const Jurisdiction = sequelize.define('jurisdiction', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "user", allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    position: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique:true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    is_online: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    phone_number: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING}
})

const Messages = sequelize.define('messages', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    date: {type: DataTypes.DATEONLY, allowNull: false},
    time: {type: DataTypes.TIME, allowNull: false},
    text: {type: DataTypes.STRING},
})


const Regions = sequelize.define('regions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})
const Cities = sequelize.define('cities', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})
const Streets = sequelize.define('streets', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})
const Areas = sequelize.define('areas', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, allowNull: false},
})
const RegionTypes = sequelize.define('region_types', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const HouseTypes = sequelize.define('house_types', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const FlatTypes = sequelize.define('flat_types', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const CityTypes = sequelize.define('city_types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const StreetTypes = sequelize.define('street_types', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const Statuses = sequelize.define('statuses', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, {timestamps: false});
const ContractTypes = sequelize.define('contract_types', {
        id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},

},
{timestamps:false}
)
const CourtTypes = sequelize.define('court_types', {
        id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
},
{timestamps:false}
);
const CourtLevels = sequelize.define('court_levels', {
        id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
},
{timestamps:false}
);
const BlockTypes = sequelize.define('block_types', {
        id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
},
{timestamps:false}
);
const Actions = sequelize.define('actions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    result: {type: DataTypes.TEXT, allowNull: false}, 
    createdAt: {type: DataTypes.DATE, allowNull: false}
    }
);
const ActionTypes = sequelize.define('actionTypes', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, {timestamps: false})
const ActionObjects = sequelize.define('actionObjects', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, {timestamps: false});

const Tokens = sequelize.define('tokens', {
    id: InitTemplates.id(),
    token: {type: DataTypes.STRING, allowNull: false}
}, {timestamps: false});

const Tasks = sequelize.define('tasks', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, allowNull: false},
    time: {type: DataTypes.DATE, allowNull: false, get(){
        return this.getDataValue('time')
        .toLocaleString('ru-RU');
    }},
    description: {type: DataTypes.TEXT, allowNull: false},
    isImportant: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    createdAt: {type: DataTypes.DATE, allowNull: false, get(){
        return this.getDataValue('createdAt')
        .toLocaleString('ru-RU');
    }}
})
const UsersinTask = sequelize.define('usersInTask', {
    id: InitTemplates.id(),
}, {timestamps:false});

const Groups = sequelize.define('groups', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, allowNull: false}
})


const ExecutiveDocTypes = sequelize.define('executiveDocTypes', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, allowNull: false}
}, {timestamps: false})

const CreditorTypes = sequelize.define('creditorTypes', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING(30), allowNull: false}
}, {timestamps: false});

Regions.hasMany(Bailiffs, InitTemplates.notNullForeignKey());
Cities.hasMany(Bailiffs, InitTemplates.notNullForeignKey());
Streets.hasMany(Bailiffs, InitTemplates.notNullForeignKey());
Bailiffs.belongsTo(Regions, InitTemplates.notNullForeignKey());
Bailiffs.belongsTo(Cities, InitTemplates.notNullForeignKey());
Bailiffs.belongsTo(Streets, InitTemplates.notNullForeignKey());
Bailiffs.belongsTo(Areas);
Areas.hasMany(Bailiffs);
Bailiffs.belongsTo(BlockTypes);
BlockTypes.hasMany(Bailiffs);
HouseTypes.hasMany(Bailiffs, InitTemplates.notNullForeignKey());
Bailiffs.belongsTo(HouseTypes, InitTemplates.notNullForeignKey());
FlatTypes.hasMany(Bailiffs);
Bailiffs.belongsTo(FlatTypes);
Regions.hasMany(Agents, InitTemplates.notNullForeignKey());
Cities.hasMany(Agents, InitTemplates.notNullForeignKey());
Streets.hasMany(Agents, InitTemplates.notNullForeignKey());
Agents.belongsTo(Regions, InitTemplates.notNullForeignKey());
Agents.belongsTo(Cities, InitTemplates.notNullForeignKey());
Agents.belongsTo(Streets, InitTemplates.notNullForeignKey());
Agents.belongsTo(Areas);
Areas.hasMany(Agents);
Agents.belongsTo(BlockTypes);
BlockTypes.hasMany(Agents);
HouseTypes.hasMany(Agents, InitTemplates.notNullForeignKey());
Agents.belongsTo(HouseTypes, InitTemplates.notNullForeignKey());
FlatTypes.hasMany(Agents);
Agents.belongsTo(FlatTypes);
Groups.hasMany(Agents);
Agents.belongsTo(Groups);
Users.hasMany(Agents);
Agents.belongsTo(Users);
Debtors.belongsTo(Groups, InitTemplates.notNullForeignKey());
Groups.hasMany(Debtors, InitTemplates.notNullForeignKey());


Users.belongsTo(Groups, InitTemplates.notNullForeignKey());
Groups.hasMany(Users, InitTemplates.notNullForeignKey());
Tasks.belongsTo(Users, {foreignKey: {
    name: 'creatorId',
    allowNull: false
}})
Users.hasOne(Tasks,
    {foreignKey: {
        name: 'creatorId',
        allowNull: false
    }});
Tasks.belongsToMany(Users, {foreignKey: {
    name: 'executorId',
    allowNull: false
}, through: UsersinTask})
Users.belongsToMany(Tasks, {foreignKey: {
    name: 'executorId',
    allowNull: false
}, through: UsersinTask })

UsersinTask.belongsTo(Tasks, {foreignKey: {
    allowNull: false
}})
Tasks.hasMany(UsersinTask, {foreignKey: { allowNull: false}})

Tokens.belongsTo(Users, {foreignKey:{ allowNull: false }});
Users.hasOne(Tokens, {foreignKey:{ allowNull: false }});
// Courts.hasMany(Contracts);
// Contracts.belongsTo(Courts);
Actions.belongsTo(ActionTypes, InitTemplates.notNullForeignKey());
ActionTypes.hasMany(Actions, InitTemplates.notNullForeignKey());
Actions.belongsTo(ActionObjects, InitTemplates.notNullForeignKey());
ActionObjects.hasMany(Actions, InitTemplates.notNullForeignKey());
Actions.belongsTo(Contracts, InitTemplates.notNullForeignKey());
Contracts.hasMany(Actions, InitTemplates.notNullForeignKey());
Actions.belongsTo(Users, InitTemplates.notNullForeignKey());
Users.hasMany(Actions, InitTemplates.notNullForeignKey());


Creditors.belongsTo(Groups, InitTemplates.notNullForeignKey());
Groups.hasMany(Creditors, InitTemplates.notNullForeignKey());
Users.hasMany(Messages);
Messages.belongsTo(Users, InitTemplates.notNullForeignKey());
Users.hasMany(Messages,InitTemplates.notNullForeignKey())

Contracts.hasMany(Payments, InitTemplates.notNullForeignKey());
Payments.belongsTo(Contracts, InitTemplates.notNullForeignKey());


Jurisdiction.belongsTo(Courts, InitTemplates.notNullForeignKey());
Courts.hasOne(Jurisdiction, InitTemplates.notNullForeignKey());

CreditorTypes.hasMany(Creditors, {foreignKey: {allowNull: false, name: "creditorTypeId"}});
Creditors.belongsTo(CreditorTypes, {foreignKey:{ allowNull: false, name: "creditorTypeId"}});



Contracts.belongsTo(Groups, InitTemplates.notNullForeignKey());
Groups.hasMany(Contracts, InitTemplates.notNullForeignKey());
Debtors.hasMany(Contracts, InitTemplates.notNullForeignKey());
Contracts.belongsTo(Debtors, InitTemplates.notNullForeignKey());
Cessions.hasMany(Contracts);
Contracts.belongsTo(Cessions);
Contracts.belongsTo(Creditors, InitTemplates.notNullForeignKey());
Creditors.hasMany(Contracts, InitTemplates.notNullForeignKey());
Statuses.hasMany(Contracts, InitTemplates.notNullForeignKey());
Contracts.belongsTo(Statuses, InitTemplates.notNullForeignKey());
Contracts.belongsTo(ContractTypes, {
    foreignKey: {
        name: 'typeId',
        allowNull: false
    },
});
ContractTypes.hasMany(Contracts, {
    foreignKey: {
        name: 'typeId',
        allowNull: false
    },
});

Jurisdiction.belongsTo(Courts, InitTemplates.notNullForeignKey());
Courts.hasMany(Jurisdiction, InitTemplates.notNullForeignKey());
Jurisdiction.belongsTo(Cities, InitTemplates.notNullForeignKey());
Cities.hasMany(Jurisdiction, InitTemplates.notNullForeignKey());
Jurisdiction.belongsTo(Streets, InitTemplates.notNullForeignKey());
Streets.hasMany(Jurisdiction, InitTemplates.notNullForeignKey());
Jurisdiction.belongsTo(Regions, InitTemplates.notNullForeignKey());
Regions.hasMany(Jurisdiction, InitTemplates.notNullForeignKey());

Courts.belongsTo(CourtTypes, InitTemplates.notNullForeignKey());
CourtTypes.hasMany(Courts, InitTemplates.notNullForeignKey());
Courts.belongsTo(CourtLevels, InitTemplates.notNullForeignKey());
CourtLevels.hasMany(Courts, InitTemplates.notNullForeignKey());


Regions.hasMany(Creditors, InitTemplates.notNullForeignKey());
Regions.hasMany(Debtors, InitTemplates.notNullForeignKey());
Regions.hasMany(Courts, InitTemplates.notNullForeignKey());
Cities.hasMany(Creditors, InitTemplates.notNullForeignKey());
Cities.hasMany(Debtors, InitTemplates.notNullForeignKey());
Cities.hasMany(Courts, InitTemplates.notNullForeignKey());
Streets.hasMany(Creditors, InitTemplates.notNullForeignKey());
Streets.hasMany(Debtors, InitTemplates.notNullForeignKey());
Streets.hasMany(Courts,InitTemplates.notNullForeignKey());



Creditors.belongsTo(Regions, InitTemplates.notNullForeignKey());
Debtors.belongsTo(Regions, InitTemplates.notNullForeignKey());
Courts.belongsTo(Regions, InitTemplates.notNullForeignKey());
Creditors.belongsTo(Cities, InitTemplates.notNullForeignKey());
Debtors.belongsTo(Cities, InitTemplates.notNullForeignKey());
Courts.belongsTo(Cities, InitTemplates.notNullForeignKey());
Creditors.belongsTo(Streets, InitTemplates.notNullForeignKey());
Debtors.belongsTo(Streets, InitTemplates.notNullForeignKey());
Courts.belongsTo(Streets, InitTemplates.notNullForeignKey());
Debtors.belongsTo(Areas);
Areas.hasMany(Debtors)
Courts.belongsTo(Areas);
Areas.hasMany(Courts);
Creditors.belongsTo(Areas);
Areas.hasMany(Creditors);
Creditors.belongsTo(BlockTypes);
Debtors.belongsTo(BlockTypes);
Courts.belongsTo(BlockTypes);
BlockTypes.hasMany(Creditors);
BlockTypes.hasMany(Debtors);
BlockTypes.hasMany(Courts);

Creditors.belongsTo(Cities, InitTemplates.notNullForeignKey());
Debtors.belongsTo(Cities, InitTemplates.notNullForeignKey());
Courts.belongsTo(Cities, InitTemplates.notNullForeignKey());

CityTypes.hasMany(Cities, InitTemplates.notNullForeignKey());
Cities.belongsTo(CityTypes, InitTemplates.notNullForeignKey());
StreetTypes.hasMany(Streets, InitTemplates.notNullForeignKey());
Streets.belongsTo(StreetTypes, InitTemplates.notNullForeignKey());

RegionTypes.hasMany(Regions, InitTemplates.notNullForeignKey());
Regions.belongsTo(RegionTypes, InitTemplates.notNullForeignKey());

HouseTypes.hasMany(Debtors, InitTemplates.notNullForeignKey());
Debtors.belongsTo(HouseTypes, InitTemplates.notNullForeignKey());
HouseTypes.hasMany(Creditors, InitTemplates.notNullForeignKey());
Creditors.belongsTo(HouseTypes, InitTemplates.notNullForeignKey());
HouseTypes.hasMany(Courts, InitTemplates.notNullForeignKey());
Courts.belongsTo(HouseTypes, InitTemplates.notNullForeignKey());

PassportTypes.hasMany(Passports, {foreignKey: {name: 'typeId', allowNull: false}});
Passports.belongsTo(PassportTypes, {foreignKey: {name: 'typeId', allowNull: false}});
Debtors.hasOne(Passports, InitTemplates.notNullForeignKey());
Passports.belongsTo(Debtors, InitTemplates.notNullForeignKey());
Passports.belongsTo(Groups, InitTemplates.notNullForeignKey());
Groups.hasMany(Passports, InitTemplates.notNullForeignKey());



FlatTypes.hasMany(Debtors);
Debtors.belongsTo(FlatTypes);
FlatTypes.hasMany(Creditors)
Creditors.belongsTo(FlatTypes);
FlatTypes.hasMany(Courts);
Courts.belongsTo(FlatTypes);


Creditors.hasMany(CessionsInfo, {
    foreignKey: {
        name: 'assigneeId',
        allowNull: false,
    },
    as: 'assignee'
});
CessionsInfo.belongsTo(Creditors, {
    foreignKey: {
        name: 'assigneeId',
        allowNull: false
    },
    as: 'assignee'
});
Creditors.hasMany(CessionsInfo, {
    foreignKey: {
        name: 'assignorId',
        allowNull: false,
    },
    as: 'assignor'  
});
CessionsInfo.belongsTo(Creditors, {
    foreignKey: {
        name: 'assignorId',
        allowNull: false,
    },
    as: 'assignor'
});

CessionsInfo.belongsTo(Cessions, InitTemplates.notNullForeignKey());
Cessions.hasMany(CessionsInfo, InitTemplates.notNullForeignKey());
Cessions.belongsTo(Creditors, {foreignKey: {name: 'lastAssigneeId', allowNull: false}, as: 'lastAssignee'});
Creditors.hasMany(Cessions, {foreignKey: {name: 'lastAssigneeId', allowNull: false}, as: 'lastAssignee'});
Cessions.belongsTo(Creditors, {foreignKey: {name: 'lastAssignorId', allowNull: false}, as: 'lastAssignor'});
Creditors.hasMany(Cessions, {foreignKey: {name: 'lastAssignorId', allowNull: false}, as: 'lastAssignor'});
Creditors.belongsTo(Cessions, {foreignKey: {name: 'defaultCessionId'}, constraints: false});
Cessions.hasMany(Creditors, {foreignKey: {name: 'defaultCessionId'}, constraints: false});
Cessions.belongsTo(Groups, InitTemplates.notNullForeignKey());
Groups.hasMany(Cessions, InitTemplates.notNullForeignKey());
CessionsInfo.belongsTo(Groups, InitTemplates.notNullForeignKey());
Groups.hasMany(CessionsInfo, InitTemplates.notNullForeignKey());
CessionsInfo.hasMany(CessionsEnclosures, {foreignKey: {name: 'cessionsInfoId', allowNull: false}});
CessionsEnclosures.belongsTo(CessionsInfo, {foreignKey: {name: 'cessionsInfoId', allowNull: false}});

ExecutiveDocs.belongsTo(ExecutiveDocTypes, {foreignKey: {allowNull: false, name: 'typeId'}});
ExecutiveDocTypes.hasMany(ExecutiveDocs, {foreignKey: {allowNull: false, name: 'typeId'}});
ExecutiveDocs.belongsTo(Contracts, InitTemplates.notNullForeignKey());
Contracts.hasOne(ExecutiveDocs,  InitTemplates.notNullForeignKey());
ExecutiveDocs.belongsTo(Bailiffs, InitTemplates.notNullForeignKey());
Bailiffs.hasMany(ExecutiveDocs, InitTemplates.notNullForeignKey());
ExecutiveDocs.belongsTo(Courts, InitTemplates.notNullForeignKey());
Courts.hasMany(ExecutiveDocs, InitTemplates.notNullForeignKey());

CourtClaims.belongsTo(CourtClaimsStatuses, {foreignKey: {allowNull: false, name: 'statusId'}});
CourtClaimsStatuses.hasMany(CourtClaims, {foreignKey: {allowNull: false, name: 'statusId'}});
CourtClaims.belongsTo(CourtClaimsTypes, {foreignKey: {allowNull: false, name: 'typeId'}});
CourtClaimsTypes.hasMany(CourtClaims, {foreignKey: {allowNull: false, name: 'typeId'}});
CourtClaims.belongsTo(Courts,  InitTemplates.notNullForeignKey());
Courts.hasMany(CourtClaims, InitTemplates.notNullForeignKey());
CourtClaims.belongsTo(Contracts, InitTemplates.notNullForeignKey());
Contracts.hasMany(CourtClaims, InitTemplates.notNullForeignKey());
CourtClaims.belongsTo(Agents, InitTemplates.notNullForeignKey());
Agents.hasMany(CourtClaims, InitTemplates.notNullForeignKey());

Requisites.belongsTo(BankRequisites, {foreignKey: {name: 'bankRequisitesId', allowNull: false}});
BankRequisites.hasMany(Requisites, {foreignKey: {name: 'bankRequisitesId', allowNull: false}});
Creditors.belongsTo(Requisites, {foreignKey: {name: 'requisitesId'}});
Requisites.hasOne(Creditors, {foreignKey: {name: 'requisitesId'}});


module.exports = {
    Jurisdiction, Users, Messages, Regions, Cities, Streets, CityTypes, StreetTypes, RegionTypes, HouseTypes, FlatTypes, Areas, ContractTypes, Statuses, CourtLevels, CourtTypes, BlockTypes, Actions, ActionObjects, ActionTypes, Tokens, Tasks, UsersinTask, Groups, ExecutiveDocTypes, CreditorTypes
}


