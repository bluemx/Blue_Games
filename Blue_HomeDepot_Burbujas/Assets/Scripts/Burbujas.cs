using UnityEngine;


[CreateAssetMenu(fileName = "Nueva Burbuja", menuName = "Burbuja Herramienta")]
public class Burbujas : ScriptableObject
{
    [SerializeField] private int valor;
    [SerializeField] private bool tache;
    

    public int valorBurbuja { get { return valor; } }
    public bool tacheBurbuja { get { return tache; } }

    
}
