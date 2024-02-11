-- Pull in the wezterm API
local wezterm = require("wezterm")

-- This table will hold the configuration.
local config = {}

-- In newer versions of wezterm, use the config_builder which will
-- help provide clearer error messages
if wezterm.config_builder then
  config = wezterm.config_builder()
end

--config.default_domain = "WSL:Ubuntu"

config.initial_cols = 100
config.initial_rows = 30
config.color_scheme = "OneHalfDark"
config.font = wezterm.font("CaskaydiaCove Nerd Font", { weight = "DemiBold" })
config.font_size = 13.5
--config.default_prog = { "C:\\Program Files\\PowerShell\\7\\pwsh.exe", "--nologo" }
config.hide_tab_bar_if_only_one_tab = true
config.window_decorations = "RESIZE"
config.keys = {
  {
    key = "r",
    mods = "CTRL|SHIFT",
    action = wezterm.action.ReloadConfiguration,
  },
}

-- NVIM Zen Mode --
wezterm.on('user-var-changed', function(window, pane, name, value)
  local overrides = window:get_config_overrides() or {}
  if name == "ZEN_MODE" then
    local incremental = value:find("+")
    local number_value = tonumber(value)
    if incremental ~= nil then
      while (number_value > 0) do
        window:perform_action(wezterm.action.IncreaseFontSize, pane)
        number_value = number_value - 1
      end
      overrides.enable_tab_bar = false
    elseif number_value < 0 then
      window:perform_action(wezterm.action.ResetFontSize, pane)
      overrides.font_size = nil
      overrides.enable_tab_bar = true
    else
      overrides.font_size = number_value
      overrides.enable_tab_bar = false
    end
  end
  window:set_config_overrides(overrides)
end)

-- MICA --
config.window_background_opacity = 0.8
--config.win32_system_backdrop = "Mica"

-- and finally, return the configuration to wezterm
return config
