exports.getMeterials = (req, res) => {
  res.status(200).json({
    code: 200,
    message: 'success',
    result: materials
  })
}

exports.calculate = (req, res) => {
  let fromMaterial = req.body.from;
  let fromType = req.body.fromtype;
  let toMaterial = req.body.to;

  let fullMaterialPath;
  let fullResult;
  calculate(fromMaterial, fromType, toMaterial, 0, (result, materialPath) => {
    if (result) fullMaterialPath = `${fromMaterial} > ${materialPath}`;
    console.log(fullMaterialPath);
  });
}
const calculate = (fromMaterial, fromType, toMaterial, index, cb) => {
  if (index > 5) {
    return cb(false);
  }
  formulars.forEach((formular) => {
    if ((fromMaterial !== null && formular.element.includes(fromMaterial)) || (fromType !== null && formular.element.includes(fromType))) {
      if (formular.material === toMaterial) {
        return cb(true, `${formular.material}`);
      }
      else calculate(formular.material, formular.type, toMaterial, index+1, (result, materialPath) => {
        if (result) return cb(true, `${formular.material} > ${materialPath}`);
        else return cb(false, '');
      });
    }
  })
}

// material: material's name, type: material's type
const materials = [
  {material: '중화제 (청)', type: '(중화제)'},
  {material: '중화제 (적)', type: '(중화제)'}
]

// type: material type, materials: materials of type
const types = [

]

// material: material of synthesis's result, type: material's type, element: elements of formula
const formulas = [

]
