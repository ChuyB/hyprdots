# Directorio de destino para los enlaces simbólicos
target_dir="$HOME/.config"

# Lista de directorios y archivos a enlazar
stow_targets=(
    hypr
    wal
    wezterm
)

# Función para crear enlaces simbólicos con Stow
stow_config() {
    for target in "${stow_targets[@]}"; do
        stow --adopt -t "$target_dir/$target" "$target"
    done
}

# Ejecutar la función
stow_config

git reset .
