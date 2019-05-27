<?php

namespace app\modules\api\models;

use Yii;

/**
 * This is the model class for table "categorias".
 *
 * @property int $idCategoria
 * @property string $descripcion
 * @property bool $activo
 *
 * @property Productos[] $productos
 */
class Categorias extends \yii\db\ActiveRecord
{
    const SCENARIO_CREATE = 'create';
    const SCENARIO_UPDATE = 'update';
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'categorias';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['descripcion', 'activo'], 'required'],
            [['activo'], 'boolean'],
            [['idCategoria'], 'integer'],
            [['descripcion'], 'string', 'max' => 100],
        ];
    }

    public function scenarios() {
        $scenarios = parent::scenarios();
        $scenarios['create'] =  ['descripcion', 'activo'];
        $scenarios['update'] =  ['idCategoria','descripcion', 'activo'];

        return $scenarios;
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'idCategoria' => 'Id Categoria',
            'descripcion' => 'Descripcion',
            'activo' => 'Activo',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getProductos()
    {
        return $this->hasMany(Productos::className(), ['idCategoria' => 'idCategoria']);
    }
}
