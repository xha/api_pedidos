<?php

namespace app\modules\api\controllers;

use Yii;
use yii\data\ActiveDataProvider;
use app\modules\api\models\Categorias;

class CategoriasController extends \yii\web\Controller
{
    public $enableCsrfValidation=false;

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionCreate()
    {
        \Yii::$app->response->format = \Yii\web\Response::FORMAT_JSON;
        $model = new Categorias();
        $model->scenario = Categorias::SCENARIO_CREATE;
        $model->attributes= \YII::$app->request->post();

        $retorno = array('status' => false, 'data' => '');
        
        if ($model->validate()) {
            $model->save();
            $retorno['status'] = true;
            $retorno['data'] = "Registro Actualizado";
        } else {
            $retorno['data'] = $model->getErrors();
        }

        return $retorno;
        //return array('status' => true);
    }

    public function actionUpdate()
    {
        \Yii::$app->response->format = \Yii\web\Response::FORMAT_JSON;
        $retorno = array('status' => false, 'data' => '');
        $data = \YII::$app->request->post();

        if ($data['id'] > 0) {
            $model = Categorias::findOne($data['idCategoria']);
            if (count($model)) {
                $model->descripcion = $data['descripcion'];
                $model->activo = $data['activo'];
                $model->save();
                $retorno['status'] = true;
                $retorno['data'] = "Registro Actualizado";
            } else {
                $retorno['data'] = "Registro no existente";
            }            
        } else {
            $retorno['data'] = "Error en el ID";
        }

        return $retorno;
    }

    public function actionList($id = null,$descripcion = null, $activo = null)
    {
        \Yii::$app->response->format = \Yii\web\Response::FORMAT_JSON;
        $connection = \Yii::$app->db;
        $model = new Categorias();

        $retorno = array('status' => false, 'data' => '');
        $query = $model::find();

        if ($id!="") $query->andFilterWhere(['idCategoria' => $id]);
        if ($activo!="") $query->andFilterWhere(['activo' => $activo]);
        if ($descripcion!="") $query->andFilterWhere(['like', 'descripcion', $descripcion]);

        $listado = $query->all();
        
        if (count($listado) > 0) {
            $retorno['status'] = true;
            $retorno['data'] = $listado;
        } else {
            $retorno['data'] = $model->getErrors();
        }

        return $retorno;
    }

    public function actionDelete($id)
    {
        \Yii::$app->response->format = \Yii\web\Response::FORMAT_JSON;
        $connection = \Yii::$app->db;
        //$query = "UPDATE ISFA_Accion SET activo=0 WHERE id_accion=".$id;
        //$connection->createCommand($query)->query();
        //$this->findModel($id)->delete();
        $retorno = array('status' => false, 'data' => '');
        
        if (($id > 0) and ($id!="")) {
            $connection->createCommand()->update('Categorias', ['activo' => 0], ['idCategoria' => $id])->execute();
            //$connection->createCommand()->update('Categorias', ['activo' => 0], 'idCategoria = '.$id)->execute();
            $retorno['status'] = true;
            $retorno['data'] = "Registro Desactivado";
        } else {
            $retorno['data'] = "Error en el ID";
        }

        return $retorno;
        //return array('status' => true);
    }
}
