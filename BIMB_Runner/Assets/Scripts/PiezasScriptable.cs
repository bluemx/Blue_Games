using UnityEngine;


[CreateAssetMenu(fileName = "Nueva Pieza", menuName = "Pieza")]
public class PiezasScriptable : ScriptableObject
{
    [SerializeField] private int valor;
    [SerializeField] private bool piedra;
    [SerializeField] private int numero;


    public int valorPieza { get { return valor; } }
    public bool esPiedra { get { return piedra; } }

    public int numeroObjeto { get { return numero; } }


}

