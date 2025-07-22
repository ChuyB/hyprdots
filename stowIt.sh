# Directorio de destino para los enlaces simbólicos
target_dir="$HOME/.config"

# Lista de directorios y archivos a enlazar
stow_targets_folders=(
    hypr
    wal
    wezterm
    ags
    dunst
    fuzzel
)

stow_targets_root=(
    zsh
    tmux
)

# Función para crear enlaces simbólicos con Stow
stow_config_folders() {
    for target in "${stow_targets_folders[@]}"; do
        stow --adopt -t "$target_dir/$target" "$target"
    done
}

stow_config_root() {
    for target in "${stow_targets_root[@]}"; do
        stow --adopt -t "$HOME" "$target"
    done
}

# Ejecutar la función
stow_config_folders
stow_config_root


git reset --hard
